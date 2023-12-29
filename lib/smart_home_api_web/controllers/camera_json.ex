defmodule SmartHomeApiWeb.CameraJSON do
  alias SmartHomeApi.Cameras.Camera

  @doc """
  Renders a list of cameras.
  """
  def index(%{cameras: cameras}) do
    %{data: for(camera <- cameras, do: data(camera))}
  end

  @doc """
  Renders a single camera.
  """
  def show(%{camera: camera}) do
    %{data: data(camera)}
  end

  defp data(%Camera{} = camera) do
    %{
      id: camera.id,
      flashlight: camera.flashlight,
      resolution: camera.resolution,
      timer: camera.timer,
      iso: camera.iso,
      autofocus: camera.autofocus,
      zoom: camera.zoom
    }
  end
end
