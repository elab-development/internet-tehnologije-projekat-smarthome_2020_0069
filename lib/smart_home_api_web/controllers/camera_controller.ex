defmodule SmartHomeApiWeb.CameraController do
  use SmartHomeApiWeb, :controller

  alias SmartHomeApi.Cameras
  alias SmartHomeApi.Cameras.Camera

  action_fallback SmartHomeApiWeb.FallbackController

  def index(conn, _params) do
    cameras = Cameras.list_cameras()
    render(conn, :index, cameras: cameras)
  end

  def create(conn, %{"camera" => camera_params}) do
    with {:ok, %Camera{} = camera} <- Cameras.create_camera(camera_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/cameras/#{camera}")
      |> render(:show, camera: camera)
    end
  end

  def show(conn, %{"id" => id}) do
    camera = Cameras.get_camera!(id)
    render(conn, :show, camera: camera)
  end

  def update(conn, %{"id" => id, "camera" => camera_params}) do
    camera = Cameras.get_camera!(id)

    with {:ok, %Camera{} = camera} <- Cameras.update_camera(camera, camera_params) do
      render(conn, :show, camera: camera)
    end
  end

  def delete(conn, %{"id" => id}) do
    camera = Cameras.get_camera!(id)

    with {:ok, %Camera{}} <- Cameras.delete_camera(camera) do
      send_resp(conn, :no_content, "")
    end
  end
end
