defmodule SmartHomeApiWeb.Router do
  use SmartHomeApiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", SmartHomeApiWeb do
    pipe_through :api
    get "/", DefaultController, :index
  end
end
