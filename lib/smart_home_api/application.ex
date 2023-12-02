defmodule SmartHomeApi.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      SmartHomeApiWeb.Telemetry,
      SmartHomeApi.Repo,
      {DNSCluster, query: Application.get_env(:smart_home_api, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: SmartHomeApi.PubSub},
      # Start a worker by calling: SmartHomeApi.Worker.start_link(arg)
      # {SmartHomeApi.Worker, arg},
      # Start to serve requests, typically the last entry
      SmartHomeApiWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: SmartHomeApi.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    SmartHomeApiWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
