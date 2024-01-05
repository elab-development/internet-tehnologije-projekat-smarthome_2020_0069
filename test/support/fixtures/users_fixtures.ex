defmodule SmartHomeApi.UsersFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `SmartHomeApi.Users` context.
  """

  @doc """
  Generate a user.
  """
  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(%{
        name: "some name",
        password: "some password",
        surname: "some surname",
        username: "some username"
      })
      |> SmartHomeApi.Users.create_user()

    user
  end
end
