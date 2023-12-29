defmodule SmartHomeApi.ThermostatsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `SmartHomeApi.Thermostats` context.
  """

  @doc """
  Generate a thermostat.
  """
  def thermostat_fixture(attrs \\ %{}) do
    {:ok, thermostat} =
      attrs
      |> Enum.into(%{
        humidity: 120.5,
        temperature: 120.5,
        timer: 42
      })
      |> SmartHomeApi.Thermostats.create_thermostat()

    thermostat
  end
end
