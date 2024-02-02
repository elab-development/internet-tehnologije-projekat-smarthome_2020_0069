defmodule SmartHomeApiWeb.ThermostatController do
  alias SmartHomeApiWeb.Utils.Utils
  alias SmartHomeApi.Devices
  alias Ecto.Repo
  use SmartHomeApiWeb, :controller

  alias SmartHomeApi.Thermostats
  alias SmartHomeApi.Thermostats.Thermostat
  alias SmartHomeApiWeb.Auth.ErrorResponse
  alias SmartHomeApi.Repo
  alias SmartHomeApi.Devices.Device
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
          thermostats: Thermostats.list_thermostats(user_id, page_number, page_size)
        })

      _ ->
        raise ErrorResponse.BadRequest, message: "Page number or/and page size is/are invalid."

    end
  end

  def index(_conn, _params) do
    raise ErrorResponse.BadRequest, message: "Page number and page size are required."
  end

  def create(conn, %{"thermostat" => thermostat_params}) do

    if(Map.has_key?(thermostat_params, "location_id")) do
      user_role = UserRoles.get_user_role(conn.assigns.user.id, Map.get(thermostat_params, "location_id"))

      if user_role != nil and user_role.role == "ADMIN" do
        result = Repo.transaction(fn->
          {:ok, %Device{} = device} = Devices.create_device(thermostat_params)
          Thermostats.create_thermostat(Map.put(thermostat_params, "device_id", device.id))
        end)

        case result do
          {:ok, _} ->
           render(conn, "create.json", %{thermostat: Utils.string_keys_to_atoms(thermostat_params)})
          _->
           raise ErrorResponse.DatabaseError, message: "Error while creating thermostat."
        end
      else
        raise ErrorResponse.Forbidden, message: "You don't have permissions for this action."
      end

    else
      raise ErrorResponse.BadRequest, message: "Must provide location id for this action"
    end

  end


  def show(conn, %{"id" => id}) do
    case thermostat = Thermostats.get_full_thermostat(conn.assigns.user.id, id) do
      nil ->
        raise ErrorResponse.BadRequest, message: "Invalid thermostat id"
      _ ->
      if thermostat.user_id == conn.assigns.user.id do
          render(conn, "show.json", %{thermostat: thermostat})
      else
        raise ErrorResponse.Forbidden, message: "You don't have permissions for this action."
      end
    end
  end

  def update(conn, %{"id" => id, "thermostat" => thermostat_params}) do

    case thermostat = Thermostats.get_full_thermostat(conn.assigns.user.id, id) do
      nil ->
        raise ErrorResponse.BadRequest, message: "Invalid thermostat id."
      _ ->
        user_role = UserRoles.get_user_role(conn.assigns.user.id, thermostat.location_id)
      if thermostat.user_id == conn.assigns.user.id and (user_role.role == "ADMIN" or user_role.role == "USER") do
        thermostat_object = %Thermostat{
          device_id: thermostat.device_id,
          humidity: thermostat.humidity,
          temperature: thermostat.temperature,
          timer: thermostat.timer
        }
        case Thermostats.update_thermostat(thermostat_object, thermostat_params) do
          {:ok, %Thermostat{} = thermostatNew} ->
            render(conn, "patch.json", %{thermostat: thermostatNew})
          _ ->
            raise ErrorResponse.DatabaseError, message: "Error while patching data."
        end
      else
        raise ErrorResponse.Forbidden, message: "You don't have permissions for this action."
      end
    end
  end
end
