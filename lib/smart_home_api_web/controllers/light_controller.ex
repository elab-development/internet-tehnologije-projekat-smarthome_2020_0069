defmodule SmartHomeApiWeb.LightController do
  alias SmartHomeApi.Devices
  alias Ecto.Repo
  alias SmartHomeApiWeb.Utils.Utils
  use SmartHomeApiWeb, :controller

  alias SmartHomeApi.Lights
  alias SmartHomeApi.Lights.Light
  alias SmartHomeApi.Devices.Device
  alias SmartHomeApiWeb.Auth.ErrorResponse
  alias SmartHomeApi.Repo


  action_fallback SmartHomeApiWeb.FallbackController

  def index(conn, _params) do
    lights = Lights.list_lights()
    render(conn, :index, lights: lights)
  end

  def create(conn, %{"light" => light_params}) do
    result = Repo.transaction(fn->
      {:ok, %Device{} = device} = Devices.create_device(Map.put(light_params, "user_id", conn.assigns.user.id))
      Lights.create_light(Map.put(light_params, "device_id", device.id))
    end)

    case result do
      {:ok, _} ->
        render(conn, "create.json", %{light: Utils.string_keys_to_atoms(light_params)})
      _->
        raise ErrorResponse.DatabaseError, message: "Error while creating light."
    end
  end

  def show(conn, %{"id" => id}) do
    case light = Lights.get_full_light(id) do
      nil ->
        raise ErrorResponse.BadRequest, message: "Invalid light id."
      _ ->
      if light.user_id == conn.assigns.user.id do
          render(conn, "show.json", %{light: light})
      else
        raise ErrorResponse.Forbidden, message: "You don't have permissions for this action."
      end
    end
  end

  def update(conn, %{"id" => id, "light" => light_params}) do
    case light = Lights.get_full_light(id) do
      nil ->
        raise ErrorResponse.BadRequest, message: "Invalid light id."
      _ ->
      if light.user_id == conn.assigns.user.id do
        light_object = %Light{
          device_id: light.device_id,
          light_level: light.light_level,
          rgb_color: light.rgb_color
        }
        case Lights.update_light(light_object, light_params) do
          {:ok, %Light{} = lightNew} ->
            render(conn, "patch.json", %{light: lightNew})
          _ ->
            raise ErrorResponse.DatabaseError, message: "Error while patching data."
        end
      else
        raise ErrorResponse.Forbidden, message: "You don't have permissions for this action."
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    light = Lights.get_light!(id)

    with {:ok, %Light{}} <- Lights.delete_light(light) do
      send_resp(conn, :no_content, "")
    end
  end
end
