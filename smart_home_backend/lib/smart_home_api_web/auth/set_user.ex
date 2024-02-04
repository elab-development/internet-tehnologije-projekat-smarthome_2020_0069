defmodule SmartHomeApiWeb.Auth.SetUser do
  import Plug.Conn
  alias SmartHomeApiWeb.Auth.ErrorResponse
  alias SmartHomeApi.Users

  def init(_options) do
  end

  def call(conn, _options) do
    if conn.assigns[:user] do
      conn
    else
      user_id = get_session(conn, :user_id)
      if user_id == nil do
         raise ErrorResponse.Unauthorized, message: "Unauthorized"
      end
      user = Users.get_user!(user_id)
      cond do
        user_id && user ->
          assign(conn, :user, user)
        true -> assign(conn, :user, nil)
      end
    end
  end

end
