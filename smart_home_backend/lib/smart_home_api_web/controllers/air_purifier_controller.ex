defmodule SmartHomeApiWeb.AirPurifierController do
  use SmartHomeApiWeb, :controller

  alias SmartHomeApi.AirPurifiers
  alias SmartHomeApi.AirPurifiers.AirPurifier

  action_fallback SmartHomeApiWeb.FallbackController

  def index(conn, _params) do
    air_purifiers = AirPurifiers.list_air_purifiers()
    render(conn, :index, air_purifiers: air_purifiers)
  end

  def create(conn, %{"air_purifier" => air_purifier_params}) do
    with {:ok, %AirPurifier{} = air_purifier} <- AirPurifiers.create_air_purifier(air_purifier_params) do
      conn
      |> put_status(:created)
      |> render(:show, air_purifier: air_purifier)
    end
  end

  def show(conn, %{"id" => id}) do
    air_purifier = AirPurifiers.get_air_purifier!(id)
    render(conn, :show, air_purifier: air_purifier)
  end

  def update(conn, %{"id" => id, "air_purifier" => air_purifier_params}) do
    air_purifier = AirPurifiers.get_air_purifier!(id)

    with {:ok, %AirPurifier{} = air_purifier} <- AirPurifiers.update_air_purifier(air_purifier, air_purifier_params) do
      render(conn, :show, air_purifier: air_purifier)
    end
  end

  def delete(conn, %{"id" => id}) do
    air_purifier = AirPurifiers.get_air_purifier!(id)

    with {:ok, %AirPurifier{}} <- AirPurifiers.delete_air_purifier(air_purifier) do
      send_resp(conn, :no_content, "")
    end
  end
end
