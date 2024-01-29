defmodule SmartHomeApi.DevicesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `SmartHomeApi.Devices` context.
  """

  @doc """
  Generate a device.
  """
  def device_fixture(attrs \\ %{}) do
    {:ok, device} =
      attrs
      |> Enum.into(%{
        room: "some room",
        state: "some state"
      })
      |> SmartHomeApi.Devices.create_device()

    device
  end
end
