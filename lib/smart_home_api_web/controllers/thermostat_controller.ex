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

  action_fallback SmartHomeApiWeb.FallbackController

  def index(conn, _params) do
    thermostats = Thermostats.list_thermostats()
    render(conn, :index, thermostats: thermostats)
  end

  def create(conn, %{"thermostat" => thermostat_params}) do

    result = Repo.transaction(fn->
      {:ok, %Device{} = device} = Devices.create_device(Map.put(thermostat_params, "user_id", conn.assigns.user.id))
      Thermostats.create_thermostat(Map.put(thermostat_params, "device_id", device.id))
    end)

    case result do
      {:ok, _} ->
        render(conn, "create.json", %{thermostat: Utils.string_keys_to_atoms(thermostat_params)})
      _->
        raise ErrorResponse.DatabaseError, message: "Error while creating thermostat."
    end
  end


  def show(conn, %{"id" => id}) do

    case thermostat = Thermostats.get_full_thermostat(id) do
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
    case thermostat = Thermostats.get_full_thermostat(id) do
      nil ->
        raise ErrorResponse.BadRequest, message: "Invalid thermostat id."
      _ ->
      if thermostat.user_id == conn.assigns.user.id do
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

  def delete(conn, %{"id" => id}) do
    thermostat = Thermostats.get_thermostat!(id)

    with {:ok, %Thermostat{}} <- Thermostats.delete_thermostat(thermostat) do
      send_resp(conn, :no_content, "")
    end
  end
end
