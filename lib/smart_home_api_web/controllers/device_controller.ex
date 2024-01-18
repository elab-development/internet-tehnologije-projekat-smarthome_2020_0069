defmodule SmartHomeApiWeb.DeviceController do
  use SmartHomeApiWeb, :controller

  alias SmartHomeApi.Devices
  alias SmartHomeApi.Devices.Device
  alias SmartHomeApiWeb.Auth.ErrorResponse

  action_fallback SmartHomeApiWeb.FallbackController

  def index(conn, %{"page_number" => page_number, "page_size" => page_size}) do
    user_id = conn.assigns.user.id
    devices = Devices.list_devices(user_id, page_number, page_size)

    if page_number > 0 && page_size > 0 do
      conn
      |> put_status(:ok)
      |> render("index.json", %{devices: devices})
    else
      raise ErrorResponse.BadRequest, message: "Page number or/and page size is/are invalid."
    end
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
      if device.user_id == conn.assigns.user.id do
          Devices.delete_device(device)
          render(conn, "device.json", %{device: device})
      else
        raise ErrorResponse.Forbidden, message: "You don't have permissions for this action."
      end
    end
  end
end
