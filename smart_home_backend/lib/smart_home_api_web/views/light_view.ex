defmodule SmartHomeApiWeb.LightView do
  use SmartHomeApiWeb, :view

  def render("show.json", %{light: light}) do
    %{
      id: light.device_id,
      light_level: light.light_level,
      rgb_color: light.rgb_color,
      state: light.state,
      user_id: light.user_id,
      place: light.place,
      light_state: light.light_state
    }
  end

  def render("index.json", %{lights: lights}) do
    %{lights: lights}
  end

  def render("patch.json", %{light: light}) do
    %{
      id: light.device_id,
      light_level: light.light_level,
      rgb_color: light.rgb_color,
      light_state: light.light_state
    }
  end

  def render("create.json", %{light: light}) do
    %{
      place: light.place,
      state: light.state,
      light_level: light.light_level,
      rgb_color: light.rgb_color
    }
  end
end
