defmodule SmartHomeApiWeb.Router do
  use SmartHomeApiWeb, :router
  use Plug.ErrorHandler

  defp handle_errors(conn, %{reason: %Phoenix.Router.NoRouteError{message: _message}}) do
    conn
    |> json(%{errors: "Invalid route"})
    |> halt()
  end

  defp handle_errors(conn, %{reason: %{message: message}}) do
    conn
    |> json(%{errors: message})
    |> halt()
  end

  pipeline :auth do
    plug :accepts, ["json"]
  end

  scope "/auth", SmartHomeApiWeb do
    pipe_through :auth
    post "/register", UserController, :create
    post "/sign_in", UserController, :sign_in
  end

end
