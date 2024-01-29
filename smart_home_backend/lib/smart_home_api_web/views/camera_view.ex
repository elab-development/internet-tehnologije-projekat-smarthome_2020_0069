defmodule SmartHomeApiWeb.CameraView do
  use SmartHomeApiWeb, :view

  def render("show.json", %{camera: camera}) do
    %{
      id: camera.device_id,
      autofocus: camera.autofocus,
      flashlight: camera.flashlight,
      iso: camera.iso,
      resolution: camera.resolution,
      timer: camera.timer,
      zoom: camera.zoom,
      geolocation: camera.geolocation,
      state: camera.state,
      user_id: camera.user_id,
      place: camera.place
    }
  end

  def render("patch.json", %{camera: camera}) do
    %{
      id: camera.device_id,
      autofocus: camera.autofocus,
      flashlight: camera.flashlight,
      iso: camera.iso,
      resolution: camera.resolution,
      timer: camera.timer,
      zoom: camera.zoom,
    }
  end

  def render("create.json", %{camera: camera}) do
    %{
      autofocus: camera.autofocus,
      flashlight: camera.flashlight,
      iso: camera.iso,
      resolution: camera.resolution,
      timer: camera.timer,
      zoom: camera.zoom,
      geolocation: camera.geolocation,
      state: camera.state,
      place: camera.place
    }
  end

  def render("pictures.json", %{files: files}) do
    %{
      paths: files
    }
  end
end
