defmodule SmartHomeApiWeb.LightController do
  use SmartHomeApiWeb, :controller

  alias SmartHomeApi.Lights
  alias SmartHomeApi.Lights.Light

  action_fallback SmartHomeApiWeb.FallbackController

  def index(conn, _params) do
    lights = Lights.list_lights()
    render(conn, :index, lights: lights)
  end

  def create(conn, %{"light" => light_params}) do
    with {:ok, %Light{} = light} <- Lights.create_light(light_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/lights/#{light}")
      |> render(:show, light: light)
    end
  end

  def show(conn, %{"id" => id}) do
    light = Lights.get_light!(id)
    render(conn, :show, light: light)
  end

  def update(conn, %{"id" => id, "light" => light_params}) do
    light = Lights.get_light!(id)

    with {:ok, %Light{} = light} <- Lights.update_light(light, light_params) do
      render(conn, :show, light: light)
    end
  end

  def delete(conn, %{"id" => id}) do
    light = Lights.get_light!(id)

    with {:ok, %Light{}} <- Lights.delete_light(light) do
      send_resp(conn, :no_content, "")
    end
  end
end
