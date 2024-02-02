defmodule SmartHomeApiWeb.DeviceController do
  alias SmartHomeApi.UserRoles
  use SmartHomeApiWeb, :controller

  alias SmartHomeApi.Devices
  alias SmartHomeApi.Devices.Device
  alias SmartHomeApiWeb.Auth.ErrorResponse

  action_fallback SmartHomeApiWeb.FallbackController

  def index(conn, %{"page_number" => page_number, "page_size" => page_size}) do
    user_id = conn.assigns.user.id

    case {Integer.parse(page_number), Integer.parse(page_size)} do
      {{parsed_page_num, _}, {parsed_page_size, _}}
      when parsed_page_num > 0 and parsed_page_size > 0 ->
        conn
        |> put_status(:ok)
        |> render("index.json", %{
          devices: Devices.list_devices(user_id, page_number, page_size)
        })

      _ ->
        raise ErrorResponse.BadRequest, message: "Page number or/and page size is/are invalid."
    end
  end

  def index(_conn, _params) do
    raise ErrorResponse.BadRequest, message: "Page number and page size are required."
  end

  # def create(conn, %{"device" => device_params}) do
  #   with {:ok, %Device{} = device} <- Devices.create_device(device_params) do
  #     conn
  #     |> put_status(:created)
  #     |> put_resp_header("location", ~p"/api/devices/#{device}")
  #     |> render(:show, device: device)
  #   end
  # end

  def show(conn, %{"id" => id}) do
    device = Devices.get_device(id)
    render(conn, :show, device: device)
  end

  def update(conn, %{"id" => id, "device" => device_params}) do
    device = Devices.get_device(id)

    with {:ok, %Device{} = device} <- Devices.update_device(device, device_params) do
      render(conn, :show, device: device)
    end
  end

  def delete(conn, %{"id" => id}) do
    case device = Devices.get_device(id) do
      nil ->
        raise ErrorResponse.BadRequest, message: "Invalid device id"
      _ ->
        case user_role = UserRoles.get_user_role(conn.assigns.user.id, device.location_id) do
          nil ->
            raise ErrorResponse.Forbidden, message: "You don't have permissions for this action."

          _ ->
            if user_role.role == "ADMIN" do
              Devices.delete_device(device)
              render(conn, "device.json", %{device: device})
            else
              raise ErrorResponse.Forbidden,
                message: "You don't have permissions for this action."
            end
        end
        raise ErrorResponse.Forbidden, message: "You don't have permissions for this action."
    end
  end
end
