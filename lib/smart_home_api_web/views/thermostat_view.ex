defmodule SmartHomeApiWeb.ThermostatView do
  use SmartHomeApiWeb, :view

  def render("show.json", %{thermostat: thermostat}) do
    %{
      id: thermostat.device_id,
      humidity: thermostat.humidity,
      temperature: thermostat.temperature,
      timer: thermostat.timer,
      geolocation: thermostat.geolocation,
      state: thermostat.state,
      user_id: thermostat.user_id,
      place: thermostat.place
    }
  end

  def render("patch.json", %{thermostat: thermostat}) do
    %{
      id: thermostat.device_id,
      humidity: thermostat.humidity,
      temperature: thermostat.temperature,
      timer: thermostat.timer
    }
  end

  def render("create.json", %{thermostat: thermostat}) do
    %{
      geolocation: thermostat.geolocation,
      place: thermostat.place,
      state: thermostat.state,
      humidity: thermostat.humidity,
      temperature: thermostat.temperature,
      timer: thermostat.timer
    }
  end
end
