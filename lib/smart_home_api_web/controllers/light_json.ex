defmodule SmartHomeApiWeb.LightJSON do
  alias SmartHomeApi.Lights.Light

  @doc """
  Renders a list of lights.
  """
  def index(%{lights: lights}) do
    %{data: for(light <- lights, do: data(light))}
  end

  @doc """
  Renders a single light.
  """
  def show(%{light: light}) do
    %{data: data(light)}
  end

  defp data(%Light{} = light) do
    %{
      id: light.id,
      rgb_value: light.rgb_value,
      light_power: light.light_power
    }
  end
end
