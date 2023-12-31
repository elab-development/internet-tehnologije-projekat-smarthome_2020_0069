defmodule SmartHomeApiWeb.UserController do
  use SmartHomeApiWeb, :controller

  alias SmartHomeApi.{Users, Users.User}
  alias SmartHomeApiWeb.{Auth.Guardian, Auth.ErrorResponse}

  plug :is_authorized_user when action in [:update, :delete]

  action_fallback SmartHomeApiWeb.FallbackController

  defp is_authorized_user(conn, _opts) do
    user_id = get_session(conn, :user_id)
    user = Users.get_user!(user_id)

    if conn.assigns.user.id == user.id do
      conn
    else
      raise ErrorResponse.Forbidden, message: "You don't have permissions for this action."
    end
  end

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, :index, users: users)
  end

  def create(conn, %{
        "user" => %{"username" => _, "name" => _, "surname" => _, "password" => _} = user_params
      }) do
    case Users.create_user(user_params) do
      {:ok, %User{} = user} ->
        case Guardian.encode_and_sign(user) do
          {:ok, token, _claims} ->
            conn
            |> put_status(:created)
            |> render("user_token.json", %{user: user, token: token})

          {:error, _} ->
            raise ErrorResponse.EncodingError,
              message: "Server error"
        end

      {:error,
       %Ecto.Changeset{
         changes: %{
           name: _,
           password: _,
           surname: _,
           username: _
         }
       }} ->
        raise ErrorResponse.ConflictUsername,
          message: "The requested username is already in use. Please choose a different username."

      {:error, :databaseError} ->
        raise ErrorResponse.DatabaseError,
          message: "There was an issue with the database. Please try again later."
    end
  end

  def create(_conn, _bad_data) do
    raise ErrorResponse.BadRequest, message: "Unexpected fields in JSON body"
  end

  def sign_in(conn, %{"username" => username, "password" => password} = params) do
    undefined_params = Map.keys(params) -- ["username", "password"]

    if undefined_params == [] do
      case Guardian.authenticate(username, password) do
        {:ok, user, token} ->
          conn
          |> Plug.Conn.put_session(:user_id, user.id)
          |> put_status(:ok)
          |> render("user_token.json", %{user: user, token: token})

        {:error, :unauthorized} ->
          raise ErrorResponse.Unauthorized, message: "Password is incorrect."

        {:error, :unauthored} ->
          raise ErrorResponse.Unauthorized, message: "Username is incorrect."
      end
    else
      raise ErrorResponse.BadRequest, message: "Unexpected fields in JSON body"
    end
  end

  def sign_in(_conn, _bad_data) do
    raise ErrorResponse.BadRequest, message: "Unexpected fields in JSON body"
  end

  def sign_out(conn, %{}) do
    user = conn.assigns[:user]
    token = Guardian.Plug.current_token(conn)

    Guardian.revoke(token)

    conn
    |> Plug.Conn.clear_session()
    |> put_status(:ok)
    |> render("user_token.json", %{user: user, token: nil})
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    conn
    |> put_status(:ok)
    |> render("users.json", %{user: user})
  end

  def update_password(conn, %{"current_password" => current_password, "user" => %{"password" => _password} = user_params}) do

    undefined_keys = Map.keys(user_params) -- ["password"]
    new_params = Map.drop(user_params, undefined_keys)

    case Guardian.validate_password(current_password, conn.assigns.user.password) do
      true ->
        {:ok, user} = Users.update_user(conn.assigns.user, new_params)
        render(conn, "show.json", user: user)

      false ->
        raise ErrorResponse.Unauthorized, message: "Password incorrect."
    end
  end

  def update_password(_conn, _attrs) do
    raise ErrorResponse.BadRequest, message: "Unexpected fields in JSON body"
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
