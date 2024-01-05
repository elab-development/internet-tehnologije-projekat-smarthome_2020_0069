import Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :smart_home_api, SmartHomeApi.Repo,
  username: "postgres",
  password: "postgres",
  hostname: "localhost",
  database: "smart_home_api_test#{System.get_env("MIX_TEST_PARTITION")}",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: 10

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :smart_home_api, SmartHomeApiWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "93KSQEsm23+6v60kpurwC5sR7o+XL8zbHpqS2qNTJe4nQhAJzhjahvk9oI6ZfmHK",
  server: false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
