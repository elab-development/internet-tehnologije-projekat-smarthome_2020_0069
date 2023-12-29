defmodule SmartHomeApiWeb.ThermostatController do
  use SmartHomeApiWeb, :controller

  alias SmartHomeApi.Thermostats
  alias SmartHomeApi.Thermostats.Thermostat

  action_fallback SmartHomeApiWeb.FallbackController

  def index(conn, _params) do
    thermostats = Thermostats.list_thermostats()
    render(conn, :index, thermostats: thermostats)
  end

  def create(conn, %{"thermostat" => thermostat_params}) do
    with {:ok, %Thermostat{} = thermostat} <- Thermostats.create_thermostat(thermostat_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/thermostats/#{thermostat}")
      |> render(:show, thermostat: thermostat)
    end
  end

  def show(conn, %{"id" => id}) do
    thermostat = Thermostats.get_thermostat!(id)
    render(conn, :show, thermostat: thermostat)
  end

  def update(conn, %{"id" => id, "thermostat" => thermostat_params}) do
    thermostat = Thermostats.get_thermostat!(id)

    with {:ok, %Thermostat{} = thermostat} <- Thermostats.update_thermostat(thermostat, thermostat_params) do
      render(conn, :show, thermostat: thermostat)
    end
  end

  def delete(conn, %{"id" => id}) do
    thermostat = Thermostats.get_thermostat!(id)

    with {:ok, %Thermostat{}} <- Thermostats.delete_thermostat(thermostat) do
      send_resp(conn, :no_content, "")
    end
  end
end
