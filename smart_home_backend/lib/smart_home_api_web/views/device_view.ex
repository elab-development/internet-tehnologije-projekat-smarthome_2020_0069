defmodule SmartHomeApiWeb.DeviceView do
  use SmartHomeApiWeb, :view

  def render("index.json", %{devices: devices}) do
    %{device: devices}
  end

  def render("device.json", %{device: device}) do
    %{device: device}
  end

  def render("device_join.json", %{device: device}) do
    %{
      user_id: device.user_id,
      geolocation: device.geolocation,
      place: device.place
    }
  end
end
