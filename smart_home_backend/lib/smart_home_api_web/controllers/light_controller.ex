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
  alias SmartHomeApi.UserRoles



  action_fallback SmartHomeApiWeb.FallbackController

  def index(conn, %{"page_number" => page_number, "page_size" => page_size}) do

    user_id = conn.assigns.user.id

    case {Integer.parse(page_number), Integer.parse(page_size)} do
      {{parsed_page_num, _}, {parsed_page_size, _}}
      when parsed_page_num > 0 and parsed_page_size > 0 ->
        conn
        |> put_status(:ok)
        |> render("index.json", %{
          lights: Lights.list_lights(user_id, page_number, page_size)
        })

      _ ->
        raise ErrorResponse.BadRequest, message: "Page number or/and page size is/are invalid."
    end
  end

  def index(_conn, _params) do
    raise ErrorResponse.BadRequest, message: "Page number and page size are required."
  end

  def create(conn, %{"light" => light_params}) do

    if Map.has_key?(light_params, "location_id") do
      user_role = UserRoles.get_user_role(conn.assigns.user.id, Map.get(light_params, "location_id"))
      if user_role != nil and user_role.role == "ADMIN" do
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
      else
        raise ErrorResponse.Forbidden, message: "You don't have permissions for this action."
    end
    else
      raise ErrorResponse.BadRequest, message: "Must provide location id for this action"
    end
  end

  def show(conn, %{"id" => id}) do
    case light = Lights.get_full_light(conn.assigns.user.id, id) do
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
    case light = Lights.get_full_light(conn.assigns.user.id, id) do
      nil ->
        raise ErrorResponse.BadRequest, message: "Invalid light id."
      _ ->
        user_role = UserRoles.get_user_role(conn.assigns.user.id, light.location_id)
      if light.user_id == conn.assigns.user.id and (user_role.role == "ADMIN" or user_role.role == "USER")do
        light_object = %Light{
          device_id: light.device_id,
          light_level: light.light_level,
          rgb_color: light.rgb_color,
          light_state: light.light_state
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

  def turn_off(conn, %{"id" => id}) do
    case light = Lights.get_full_light(conn.assigns.user.id, id) do
      nil ->
        raise ErrorResponse.BadRequest, message: "Invalid light id."
      _ ->
        user_role = UserRoles.get_user_role(conn.assigns.user.id, light.location_id)
      if light.user_id == conn.assigns.user.id and (user_role.role == "ADMIN" or user_role.role == "USER") do
        light_object = %Light{
          device_id: light.device_id,
          light_level: light.light_level,
          rgb_color: light.rgb_color
        }
        light_params = %{
          light_state: :false
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

  def turn_on(conn, %{"id" => id}) do
    case light = Lights.get_full_light(conn.assigns.user.id, id) do
      nil ->
        raise ErrorResponse.BadRequest, message: "Invalid light id."
      _ ->
        user_role = UserRoles.get_user_role(conn.assigns.user.id, light.location_id)
      if light.user_id == conn.assigns.user.id and (user_role.role == "ADMIN" or user_role.role == "USER") do
        light_object = %Light{
          device_id: light.device_id,
          light_level: light.light_level,
          rgb_color: light.rgb_color
        }
        light_params = %{
          light_state: :true
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

end
