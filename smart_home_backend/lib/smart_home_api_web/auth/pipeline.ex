defmodule SmartHomeApiWeb.Auth.Pipeline do
  use Guardian.Plug.Pipeline, otp_app: :smart_home_api,
  module: SmartHomeApiWeb.Auth.Guardian,
  error_handler: SmartHomeApiWeb.Auth.GuardianErrorHandler

  plug Guardian.Plug.VerifySession
  plug Guardian.Plug.VerifyHeader
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource

end
