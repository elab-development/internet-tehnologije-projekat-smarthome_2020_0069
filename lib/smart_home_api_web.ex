defmodule SmartHomeApiWeb do
  @moduledoc """
  The entrypoint for defining your web interface, such
  as controllers, components, channels, and so on.

  This can be used in your application as:

      use SmartHomeApiWeb, :controller
      use SmartHomeApiWeb, :html

  The definitions below will be executed for every controller,
  component, etc, so keep them short and clean, focused
  on imports, uses and aliases.

  Do NOT define functions inside the quoted expressions
  below. Instead, define additional modules and import
  those modules here.
  """

  def static_paths, do: ~w(assets fonts images favicon.ico robots.txt)

  def controller do
    quote do
      use Phoenix.Controller, namespace: SmartHomeApiWeb

      import Plug.Conn
      import SmartHomeApiWeb.Gettext
      alias SmartHomeApiWeb.Router.Helpers, as: Routes

      unquote(verified_routes())
    end
  end

  def router do
    quote do
      use Phoenix.Router
      # Import common connection and controller functions to use in pipelines
      import Plug.Conn
      import Phoenix.Controller
    end
  end

  def view do
    quote do
      use Phoenix.View,
      root: "lib/smart_home_api_web/templates",
      namespace: SmartHomeApiWeb

      import Phoenix.Controller,
      only: [get_flash: 1, get_flash: 2, view_module: 1, view_template: 1]

      unquote(view_helpers())
    end
  end

  def channel do
    quote do
      use Phoenix.Channel
      import SmartHomeApiWeb.Gettext
    end
  end

  defp view_helpers do
    quote do
      import Phoenix.View

      import SmartHomeApiWeb.Gettext
      alias SmartHomeApiWeb.Router.Helpers, as: Routes
    end
  end

  def verified_routes do
    quote do
      use Phoenix.VerifiedRoutes,
        endpoint: SmartHomeApiWeb.Endpoint,
        router: SmartHomeApiWeb.Router,
        statics: SmartHomeApiWeb.static_paths()
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
