defmodule SmartHomeApiWeb.Router do

  use SmartHomeApiWeb, :router
  use Plug.ErrorHandler

  defp handle_errors(conn, %{reason: %Phoenix.Router.NoRouteError{message: _message}}) do
    conn
    |> json(%{errors: "Invalid route"})
    |> halt()
  end

  defp handle_errors(conn, %{reason: %FunctionClauseError{}}) do
    conn
    |> json(%{errors: "Invalid function call"})
    |> halt()
  end

  defp handle_errors(conn, %{reason: %{message: message}}) do
    conn
    |> json(%{errors: message})
    |> halt()
  end

  pipeline :auth do
    plug :accepts, ["json"]
    plug :fetch_session
  end

  pipeline :user do
    plug SmartHomeApiWeb.Auth.Pipeline
    plug SmartHomeApiWeb.Auth.SetUser
  end

  pipeline :device do
    plug SmartHomeApiWeb.Auth.Pipeline
    plug SmartHomeApiWeb.Auth.SetUser
  end

  scope "/auth", SmartHomeApiWeb do
    pipe_through :auth
    post "/register", UserController, :create
    post "/sign_in", UserController, :sign_in
  end

  scope "/user", SmartHomeApiWeb do
    pipe_through [:auth, :user]
    get "/sign_out", UserController, :sign_out
    get "/id/:id", UserController, :show
    post "/update_password", UserController, :update_password
  end

  scope "/device", SmartHomeApiWeb do
    pipe_through [:auth, :device]
    get "/get_devices", DeviceController, :index
    delete "/:id", DeviceController, :delete
  end

  scope "/device/thermostat", SmartHomeApiWeb do
    pipe_through [:auth, :device]
    get "/:id", ThermostatController, :show
    post "/", ThermostatController, :create
    patch "/:id", ThermostatController, :update
  end

  scope "/device/light", SmartHomeApiWeb do
    pipe_through [:auth, :device]
    get "/:id", LightController, :show
    post "/", LightController, :create
    patch "/:id", LightController, :update
    get "/:id/turn_on", LightController, :turn_on
    get "/:id/turn_off", LightController, :turn_off
  end

  scope "/device/camera", SmartHomeApiWeb do
    pipe_through [:auth, :device]
    get "/:id", CameraController, :show
    get "/pictures/:id", CameraController, :pictures
    post "/", CameraController, :create
    post "/capture/:id", CameraController, :upload
    patch "/:id", CameraController, :update
  end
end
