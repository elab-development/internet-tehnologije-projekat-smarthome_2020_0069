defmodule SmartHomeApiWeb.Router do
  use SmartHomeApiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/auth", SmartHomeApiWeb do
    pipe_through :api
    post "/register", UserController, :create
  end
end
