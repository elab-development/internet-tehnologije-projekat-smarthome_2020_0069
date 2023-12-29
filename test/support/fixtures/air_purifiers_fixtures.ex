defmodule SmartHomeApi.AirPurifiersFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `SmartHomeApi.AirPurifiers` context.
  """

  @doc """
  Generate a air_purifier.
  """
  def air_purifier_fixture(attrs \\ %{}) do
    {:ok, air_purifier} =
      attrs
      |> Enum.into(%{
        filter: 120.5,
        pm10: 42,
        pm1_0: 42,
        pm2_5: 42
      })
      |> SmartHomeApi.AirPurifiers.create_air_purifier()

    air_purifier
  end
end
