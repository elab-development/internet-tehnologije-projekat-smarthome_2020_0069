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

  #auth done
  scope "/auth", SmartHomeApiWeb do
    pipe_through :auth
    post "/register", UserController, :create
    post "/sign_in", UserController, :sign_in
  end

  #user done
  scope "/user", SmartHomeApiWeb do
    pipe_through [:auth, :user]
    get "/sign_out", UserController, :sign_out
    get "/id/:id", UserController, :show
    post "/update_password", UserController, :update_password
  end

  #device done
  scope "/device", SmartHomeApiWeb do
    pipe_through [:auth, :device]
    get "/get_devices", DeviceController, :index
    patch "/:id", DeviceController, :update
    delete "/:id", DeviceController, :delete
  end

  #thermostat done
  scope "/device/thermostat", SmartHomeApiWeb do
    pipe_through [:auth, :device]
    get "/get_thermostats", ThermostatController, :index
    get "/:id", ThermostatController, :show
    post "/", ThermostatController, :create
    patch "/:id", ThermostatController, :update
  end

  #light done
  scope "/device/light", SmartHomeApiWeb do
    pipe_through [:auth, :device]
    get "/get_lights", LightController, :index
    get "/:id", LightController, :show
    post "/", LightController, :create
    patch "/:id", LightController, :update
    get "/:id/turn_on", LightController, :turn_on
    get "/:id/turn_off", LightController, :turn_off
  end

  scope "/device/camera", SmartHomeApiWeb do
    pipe_through [:auth, :device]
    get "/get_cameras", CameraController, :index
    get "/:id", CameraController, :show
    get "/pictures/:id", CameraController, :pictures
    post "/", CameraController, :create
    post "/capture/:id", CameraController, :upload
    patch "/:id", CameraController, :update
  end

  scope "/media", SmartHomeApiWeb do
    get "/:id/:name", CameraController, :media
  end
  #speaker done
  scope "/device/speaker", SmartHomeApiWeb do
    pipe_through [:auth, :device]
    get "/get_speakers", SpeakerController, :index
    get "/:id", SpeakerController, :show
    post "/", SpeakerController, :create
    patch "/:id", SpeakerController, :update
  end

  scope "/device/air_purifier", SmartHomeApiWeb do
    pipe_through [:auth, :device]
    get "/get_air_purifiers", AirPurifierController, :index
    get "/:id", AirPurifierController, :show
    post "/", AirPurifierController, :create
    patch "/:id", AirPurifierController, :update
  end

  scope "/api/swagger" do
    forward "/", PhoenixSwagger.Plug.SwaggerUI, otp_app: :smart_home_api, swagger_file: "swagger.json"
  end

  def swagger_info do
    %{
      info: %{
        version: "1.0",
        title: "My App"
      }
    }
  end


end
