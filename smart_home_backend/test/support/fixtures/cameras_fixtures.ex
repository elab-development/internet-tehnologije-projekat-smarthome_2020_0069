defmodule SmartHomeApi.CamerasFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `SmartHomeApi.Cameras` context.
  """

  @doc """
  Generate a camera.
  """
  def camera_fixture(attrs \\ %{}) do
    {:ok, camera} =
      attrs
      |> Enum.into(%{
        autofocus: true,
        flashlight: true,
        iso: 42,
        resolution: 42,
        timer: 42,
        zoom: 120.5
      })
      |> SmartHomeApi.Cameras.create_camera()

    camera
  end
end
