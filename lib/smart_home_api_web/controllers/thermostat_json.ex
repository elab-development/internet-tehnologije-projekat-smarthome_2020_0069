defmodule SmartHomeApiWeb.ThermostatJSON do
  alias SmartHomeApi.Thermostats.Thermostat

  @doc """
  Renders a list of thermostats.
  """
  def index(%{thermostats: thermostats}) do
    %{data: for(thermostat <- thermostats, do: data(thermostat))}
  end

  @doc """
  Renders a single thermostat.
  """
  def show(%{thermostat: thermostat}) do
    %{data: data(thermostat)}
  end

  defp data(%Thermostat{} = thermostat) do
    %{
      id: thermostat.id,
      temperature: thermostat.temperature,
      humidity: thermostat.humidity,
      timer: thermostat.timer
    }
  end
end
