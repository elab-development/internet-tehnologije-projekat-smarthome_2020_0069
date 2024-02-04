defmodule SmartHomeApiWeb.AirPurifierController do
  use SmartHomeApiWeb, :controller

  alias SmartHomeApi.AirPurifiers
  alias SmartHomeApi.AirPurifiers.AirPurifier
  alias SmartHomeApi.Devices.Device
  alias SmartHomeApi.Devices
  alias SmartHomeApi.Repo
  alias SmartHomeApiWeb.Utils.Utils
  alias SmartHomeApiWeb.Auth.ErrorResponse
  alias SmartHomeApi.UserRoles

  action_fallback SmartHomeApiWeb.FallbackController

  def index(conn, %{"page_number" => page_number, "page_size" => page_size}) do
    user_id = conn.assigns.user.id

    case {Integer.parse(page_number), Integer.parse(page_size)} do
      {{parsed_page_num, _}, {parsed_page_size, _}}
      when parsed_page_num > 0 and parsed_page_size > 0 ->
        conn
        |> put_status(:ok)
        |> render("index.json", %{
          air_purifiers: AirPurifiers.list_air_purifiers(user_id, page_number, page_size)
        })

      _ ->
        raise ErrorResponse.BadRequest, message: "Page number or/and page size is/are invalid."
    end
  end

  def index(_conn, _params) do
    raise ErrorResponse.BadRequest, message: "Page number and page size are required."
  end

  def create(conn, %{"air_purifier" => air_purifier_params}) do
    if(Map.has_key?(air_purifier_params, "location_id")) do
      user_role =
        UserRoles.get_user_role(conn.assigns.user.id, Map.get(air_purifier_params, "location_id"))

      if user_role != nil and user_role.role == "ADMIN" do
        result =
          Repo.transaction(fn ->
            {:ok, %Device{} = device} =
              Devices.create_device(air_purifier_params)
              AirPurifiers.create_air_purifier(Map.put(air_purifier_params, "device_id", device.id))
          end)

        case result do
          {:ok, {:ok, airp}} ->
            render(conn, "create.json", %{air_purifier: Utils.string_keys_to_atoms(Map.put(air_purifier_params, "device_id", airp.device_id))})
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
    case air_purifier = AirPurifiers.get_full_air_purifier(conn.assigns.user.id, id) do
      nil ->
        raise ErrorResponse.BadRequest, message: "Invalid air_purifier id."
      _ ->
        if air_purifier.user_id == conn.assigns.user.id do
          render(conn, "show.json", %{air_purifier: air_purifier})
        else
          raise ErrorResponse.Forbidden, message: "You don't have permissions for this action."
        end
    end
  end

  def update(conn, %{"id" => id, "air_purifier" => air_purifier_params}) do
    case air_purifier = AirPurifiers.get_full_air_purifier(conn.assigns.user.id, id) do
      nil ->
        raise ErrorResponse.BadRequest, message: "Invalid air purifier id."

      _ ->
        user_role = UserRoles.get_user_role(conn.assigns.user.id, air_purifier.location_id)
        if air_purifier.user_id == conn.assigns.user.id and (user_role.role == "ADMIN" or user_role.role == "USER") do
          air_purifier_object = %AirPurifier{
            device_id: air_purifier.device_id,
            filter: air_purifier.filter,
            timer: air_purifier.timer,
            pm10: air_purifier.pm10,
            pm2_5: air_purifier.pm2_5,
            pm1_0: air_purifier.pm1_0
          }

          case AirPurifiers.update_air_purifier(air_purifier_object, air_purifier_params) do
            {:ok, %AirPurifier{} = airPurifiersNew} ->
              render(conn, "patch.json", %{air_purifier: airPurifiersNew})

            _ ->
              raise ErrorResponse.DatabaseError, message: "Error while patching data."
          end
        else
          raise ErrorResponse.Forbidden, message: "You don't have permissions for this action."
        end
    end
  end
end
