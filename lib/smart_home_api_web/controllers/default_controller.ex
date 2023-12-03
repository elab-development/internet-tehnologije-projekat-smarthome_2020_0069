defmodule SmartHomeApiWeb.DefaultController do
  use SmartHomeApiWeb, :controller

  def index(conn, _params) do
    text conn, "Smart house API live"
  end
end
