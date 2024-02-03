defmodule SmartHomeApiWeb.UserView do
  use SmartHomeApiWeb, :view
  alias SmartHomeApiWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "users.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "users.json")}
  end

  def render("users.json", %{user: user}) do
    %{
      id: user.id,
      name: user.name,
      surname: user.surname,
      password: user.password,
      username: user.username
    }
  end

  def render("user_token.json", %{user: user, token: token, location_id: location_id}) do
    %{
      id: user.id,
      username: user.username,
      token: token,
      location_id: location_id
    }
  end
end
