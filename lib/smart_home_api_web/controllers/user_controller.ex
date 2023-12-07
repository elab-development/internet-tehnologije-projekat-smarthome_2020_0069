defmodule SmartHomeApiWeb.UserController do
  use SmartHomeApiWeb, :controller
  alias SmartHomeApi.Users
  alias SmartHomeApi.Users.User
  alias SmartHomeApiWeb.{Auth.Guardian, Auth.ErrorResponse}

  action_fallback SmartHomeApiWeb.FallbackController

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, :index, users: users)
  end

  def create(conn, %{"user" => user_params}) do
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

  def sign_in(conn, %{"username" => username, "password" => password}) do
    case Guardian.authenticate(username, password) do
      {:ok, user, token} ->
        conn
        |> put_status(:ok)
        |> render("user_token.json", %{user: user, token: token})

      {:error, :unauthorized} ->
        raise ErrorResponse.Unauthorized, message: "Password is incorrect."

      {:error, :unauthored} ->
        raise ErrorResponse.Unauthorized, message: "Username is incorrect."
    end
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, :show, user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Users.get_user!(id)

    with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
      render(conn, :show, user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
