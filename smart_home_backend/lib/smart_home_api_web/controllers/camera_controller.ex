defmodule SmartHomeApiWeb.CameraController do
  alias SmartHomeApiWeb.Utils.Utils
  alias Ecto.Repo
  alias SmartHomeApi.Devices.Device
  alias SmartHomeApi.Devices
  alias SmartHomeApi.UserRoles
  use SmartHomeApiWeb, :controller

  alias SmartHomeApi.Cameras
  alias SmartHomeApi.Cameras.Camera
  alias SmartHomeApi.Repo
  alias SmartHomeApiWeb.Auth.ErrorResponse

  action_fallback(SmartHomeApiWeb.FallbackController)

  def index(conn, %{"page_number" => page_number, "page_size" => page_size}) do
    user_id = conn.assigns.user.id

    case {Integer.parse(page_number), Integer.parse(page_size)} do
      {{parsed_page_num, _}, {parsed_page_size, _}}
      when parsed_page_num > 0 and parsed_page_size > 0 ->
        conn
        |> put_status(:ok)
        |> render("index.json", %{
          cameras: Cameras.list_cameras(user_id, page_number, page_size)
        })

      _ ->
        raise ErrorResponse.BadRequest, message: "Page number or/and page size is/are invalid."
    end
  end

  def index(_conn, _params) do
    raise ErrorResponse.BadRequest, message: "Page number and page size are required."
  end

  def create(conn, %{"camera" => camera_params}) do
    if(Map.has_key?(camera_params, "location_id")) do
      user_role =
        UserRoles.get_user_role(conn.assigns.user.id, Map.get(camera_params, "location_id"))

      if user_role != nil and user_role.role == "ADMIN" do
        result =
          Repo.transaction(fn ->
            {:ok, device} =
              Devices.create_device(camera_params)
              Cameras.create_camera(Map.put(camera_params, "device_id", device.id))
          end)
        case result do
          {:ok, {:ok, cmr}} ->
            render(conn, "create.json", %{camera: Utils.string_keys_to_atoms(Map.put(camera_params, "device_id", cmr.device_id))})
          _ ->
            raise ErrorResponse.DatabaseError, message: "Error while creating camera."
        end
      else
        raise ErrorResponse.Forbidden, message: "You don't have permissions for this action."
      end
    else
      raise ErrorResponse.BadRequest, message: "Must provide location id for this action"
    end
  end

  def show(conn, %{"id" => id}) do
    case camera = Cameras.get_joined_camera!(conn.assigns.user.id, id) do
      nil ->
        raise ErrorResponse.BadRequest, message: "Invalid speaker id."

      _ ->
        if camera.user_id == conn.assigns.user.id do
          render(conn, "show.json", %{camera: camera})
        else
          raise ErrorResponse.Forbidden, message: "You don't have permissions for this action."
        end
    end
  end

  def update(conn, %{"id" => id, "camera" => camera_params}) do
    case camera = Cameras.get_joined_camera!(conn.assigns.user.id, id) do
      nil ->
        raise ErrorResponse.BadRequest, message: "Invalid camera id."

      _ ->
        user_role = UserRoles.get_user_role(conn.assigns.user.id, camera.location_id)
        if camera.user_id == conn.assigns.user.id and (user_role.role == "ADMIN" or user_role.role == "USER") do
          camera_object = %Camera{
            device_id: camera.device_id,
          }
          case Cameras.update_camera(camera_object, camera_params) do
             {:ok, %Camera{} = cameraNew}->
              render(conn, "patch.json", %{camera: cameraNew})
              _->
                raise ErrorResponse.DatabaseError, message: "Error while patching data."
          end
        else
          raise ErrorResponse.Forbidden, message: "You don't have permissions for this action."
        end
    end
  end

  def upload(conn, %{"id" => id, "image" => image_base64}) do
    case _camera = Cameras.get_joined_camera!(id) do
      nil ->
        raise ErrorResponse.BadRequest, message: "Invalid camera id"

      _ ->
        case Base.decode64(image_base64) do
          {:ok, image_binary} ->
            date = DateTime.utc_now()
            File.mkdir_p!("media/#{id}")

            File.write(
              "media/#{id}/#{date.year}#{date.month}#{date.day}#{date.hour}#{date.minute}#{date.second}",
              image_binary
            )

            send_resp(conn, 201, "")

          _ ->
            raise ErrorResponse.BadRequest, message: "Error decoding base64"
        end
    end
  end

  def pictures(conn, %{"id" => id}) do
    case camera = Cameras.get_joined_camera!(id) do
      nil ->
        raise ErrorResponse.BadRequest, message: "Invalid camera id"

      _ ->
        if File.exists?("media/#{id}/") do
          {:ok, files} = File.ls("media/#{id}")
          paths = []

          paths =
            for file <- files do
              "#{File.cwd!()}/media/#{id}/#{file}"
            end

          render(conn, "pictures.json", %{files: paths})
        else
          raise ErrorResponse.BadRequest, message: "No images taken by this camera"
        end
    end
  end
end
