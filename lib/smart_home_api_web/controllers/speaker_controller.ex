defmodule SmartHomeApiWeb.SpeakerController do
  use SmartHomeApiWeb, :controller

  alias SmartHomeApi.Speakers
  alias SmartHomeApi.Speakers.Speaker
  alias SmartHomeApi.Devices.Device
  alias SmartHomeApi.Devices
  alias SmartHomeApi.Repo
  alias SmartHomeApiWeb.Utils.Utils
  alias SmartHomeApiWeb.Auth.ErrorResponse

  action_fallback SmartHomeApiWeb.FallbackController

  def index(conn, _params) do
    speakers = Speakers.list_speakers()
    render(conn, :index, speakers: speakers)
  end

  def create(conn, %{"speaker" => speaker_params}) do
    result = Repo.transaction(fn->
      {:ok, %Device{} = device} = Devices.create_device(Map.put(speaker_params, "user_id", conn.assigns.user.id))
      Speakers.create_speaker(Map.put(speaker_params, "device_id", device.id))
    end)

    case result do
      {:ok, _} ->
        render(conn, "create.json", %{speaker: Utils.string_keys_to_atoms(speaker_params)})
      _->
        raise ErrorResponse.DatabaseError, message: "Error while creating light."
    end
  end

  def show(conn, %{"id" => id}) do
    case speaker = Speakers.get_full_speaker(id) do
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
    case speaker = Speakers.get_full_speaker(id) do
      nil ->
        raise ErrorResponse.BadRequest, message: "Invalid speaker id."
      _ ->
      if speaker.user_id == conn.assigns.user.id do
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

  def delete(conn, %{"id" => id}) do
    speaker = Speakers.get_speaker!(id)

    with {:ok, %Speaker{}} <- Speakers.delete_speaker(speaker) do
      send_resp(conn, :no_content, "")
    end
  end
end
