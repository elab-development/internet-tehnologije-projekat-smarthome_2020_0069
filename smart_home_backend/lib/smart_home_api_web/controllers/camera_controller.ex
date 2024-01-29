defmodule SmartHomeApiWeb.CameraController do
  alias SmartHomeApiWeb.Utils.Utils
  alias Ecto.Repo
  alias SmartHomeApi.Devices.Device
  alias SmartHomeApi.Devices
  use SmartHomeApiWeb, :controller

  alias SmartHomeApi.Cameras
  alias SmartHomeApi.Cameras.Camera
  alias SmartHomeApi.Repo
  alias SmartHomeApiWeb.Auth.ErrorResponse

  action_fallback SmartHomeApiWeb.FallbackController

  def index(conn, _params) do
    cameras = Cameras.list_cameras()
    render(conn, :index, cameras: cameras)
  end

  def create(conn, %{"camera" => camera_params}) do
    result = Repo.transaction(fn->
      {:ok, %Device{} = device} = Devices.create_device(Map.put(camera_params, "user_id", conn.assigns.user.id))
      IO.inspect(device)
      Cameras.create_camera(Map.put(camera_params, "device_id", device.id))
    end)

    case result do
      {:ok, _} ->
        render(conn, "create.json", %{camera: Utils.string_keys_to_atoms(camera_params)})
      _->
        raise ErrorResponse.DatabaseError, message: "Error while creating camera."
    end
  end

  def show(conn, %{"id" => id}) do
    camera = Cameras.get_joined_camera!(id)
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

  def upload(conn, %{"id" => id, "image" => image_base64}) do
    case _camera = Cameras.get_joined_camera!(id) do 
      nil -> raise ErrorResponse.BadRequest, message: "Invalid camera id"
      _ -> 
      case Base.decode64(image_base64) do
        {:ok, image_binary} ->
          date = DateTime.utc_now()
          File.mkdir_p!("media/#{id}")
          File.write("media/#{id}/#{date.year}#{date.month}#{date.day}#{date.hour}#{date.minute}#{date.second}", image_binary) 
          send_resp(conn, 201, "")
        _ -> raise ErrorResponse.BadRequest, message: "Error decoding base64"
      end
    end 
  end

  def pictures(conn, %{"id" => id}) do
    case camera = Cameras.get_joined_camera!(id) do 
      nil -> raise ErrorResponse.BadRequest, message: "Invalid camera id"
      _ -> 
        if File.exists?("media/#{id}/") do
          {:ok, files} = File.ls("media/#{id}")
          paths = []
          paths = for file <- files do
            "#{File.cwd!}/media/#{id}/#{file}"
          end
          render(conn, "pictures.json", %{files: paths})
        else
          raise ErrorResponse.BadRequest, message: "No images taken by this camera"
        end
    end
  end 
end
