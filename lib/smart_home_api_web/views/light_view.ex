defmodule SmartHomeApiWeb.LightView do
  use SmartHomeApiWeb, :view

  def render("show.json", %{light: light}) do
    %{
      id: light.device_id,
      light_level: light.light_level,
      rgb_color: light.rgb_color,
      geolocation: light.geolocation,
      state: light.state,
      user_id: light.user_id,
      place: light.place
    }
  end

  def render("patch.json", %{light: light}) do
    %{
      id: light.device_id,
      light_level: light.light_level,
      rgb_color: light.rgb_color
    }
  end

  def render("create.json", %{light: light}) do
    %{
      geolocation: light.geolocation,
      place: light.place,
      state: light.state,
      light_level: light.light_level,
      rgb_color: light.rgb_color
    }
  end
end
