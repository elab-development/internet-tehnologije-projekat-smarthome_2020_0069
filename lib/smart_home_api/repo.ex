defmodule SmartHomeApi.Repo do
  use Ecto.Repo,
    otp_app: :smart_home_api,
    adapter: Ecto.Adapters.Postgres
end
