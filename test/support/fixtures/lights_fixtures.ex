defmodule SmartHomeApi.LightsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `SmartHomeApi.Lights` context.
  """

  @doc """
  Generate a light.
  """
  def light_fixture(attrs \\ %{}) do
    {:ok, light} =
      attrs
      |> Enum.into(%{
        light_power: 42,
        rgb_value: 42
      })
      |> SmartHomeApi.Lights.create_light()

    light
  end
end
