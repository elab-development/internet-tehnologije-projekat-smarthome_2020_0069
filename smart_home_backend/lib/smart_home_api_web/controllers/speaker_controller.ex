defmodule SmartHomeApiWeb.SpeakerController do
  alias SmartHomeApi.UserRoles
  use SmartHomeApiWeb, :controller

  alias SmartHomeApi.Speakers
  alias SmartHomeApi.Speakers.Speaker
  alias SmartHomeApi.Devices.Device
  alias SmartHomeApi.Devices
  alias SmartHomeApi.Repo
  alias SmartHomeApiWeb.Utils.Utils
  alias SmartHomeApiWeb.Auth.ErrorResponse

  action_fallback SmartHomeApiWeb.FallbackController

  def index(conn, %{"page_number" => page_number, "page_size" => page_size}) do

    user_id = conn.assigns.user.id

    case {Integer.parse(page_number), Integer.parse(page_size)} do
      {{parsed_page_num, _}, {parsed_page_size, _}}
      when parsed_page_num > 0 and parsed_page_size > 0 ->
        conn
        |> put_status(:ok)
        |> render("index.json", %{
          speakers: Speakers.list_speakers(user_id, page_number, page_size)
        })

      _ ->
        raise ErrorResponse.BadRequest, message: "Page number or/and page size is/are invalid."
    end
  end

  def index(_conn, _params) do
    raise ErrorResponse.BadRequest, message: "Page number and page size are required."
  end

  def create(conn, %{"speaker" => speaker_params}) do
    if(Map.has_key?(speaker_params, "location_id")) do
      user_role =
        UserRoles.get_user_role(conn.assigns.user.id, Map.get(speaker_params, "location_id"))

      if user_role != nil and user_role.role == "ADMIN" do
        result =
          Repo.transaction(fn ->
            {:ok, %Device{} = device} =
              Devices.create_device(speaker_params)
              Speakers.create_speaker(Map.put(speaker_params, "device_id", device.id))
          end)

        case result do
          {:ok, {:ok, spk}} ->
            render(conn, "create.json", %{speaker: Utils.string_keys_to_atoms(Map.put(speaker_params, "device_id", spk.device_id))})
          _->
            raise ErrorResponse.DatabaseError, message: "Error while creating light."
        end
      else
        raise ErrorResponse.Forbidden, message: "You don't have permissions for this action."
      end
    else
      raise ErrorResponse.BadRequest, message: "Must provide location id for this action"
    end
  end

  def show(conn, %{"id" => id}) do
    case speaker = Speakers.get_full_speaker(conn.assigns.user.id, id) do
      nil ->
        raise ErrorResponse.BadRequest, message: "Invalid speaker id."

      _ ->
        if speaker.user_id == conn.assigns.user.id do
          render(conn, "show.json", %{speaker: speaker})
        else
          raise ErrorResponse.Forbidden, message: "You don't have permissions for this action."
        end
    end
  end

  def update(conn, %{"id" => id, "speaker" => speaker_params}) do
    case speaker = Speakers.get_full_speaker(conn.assigns.user.id, id) do
      nil ->
        raise ErrorResponse.BadRequest, message: "Invalid speaker id."

      _ ->
        user_role = UserRoles.get_user_role(conn.assigns.user.id, speaker.location_id)
        if speaker.user_id == conn.assigns.user.id and (user_role.role == "ADMIN" or user_role.role == "USER") do
          speaker_object = %Speaker{
            device_id: speaker.device_id,
            bass: speaker.bass,
            volume: speaker.volume,
            battery: speaker.battery
          }

          case Speakers.update_speaker(speaker_object, speaker_params) do
            {:ok, %Speaker{} = speakerNew} ->
              render(conn, "patch.json", %{speaker: speakerNew})

            _ ->
              raise ErrorResponse.DatabaseError, message: "Error while patching data."
          end
        else
          raise ErrorResponse.Forbidden, message: "You don't have permissions for this action."
        end
    end
  end
end
