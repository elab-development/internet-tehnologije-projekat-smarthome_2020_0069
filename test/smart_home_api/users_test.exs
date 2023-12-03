defmodule SmartHomeApi.UsersTest do
  use SmartHomeApi.DataCase

  alias SmartHomeApi.Users

  describe "users" do
    alias SmartHomeApi.Users.User

    import SmartHomeApi.UsersFixtures

    @invalid_attrs %{"": nil, name: nil, password: nil, surname: nil, username: nil}

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Users.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Users.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      valid_attrs = %{"": "some ", name: "some name", password: "some password", surname: "some surname", username: "some username"}

      assert {:ok, %User{} = user} = Users.create_user(valid_attrs)
      assert user. == "some "
      assert user.name == "some name"
      assert user.password == "some password"
      assert user.surname == "some surname"
      assert user.username == "some username"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Users.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      update_attrs = %{"": "some updated ", name: "some updated name", password: "some updated password", surname: "some updated surname", username: "some updated username"}

      assert {:ok, %User{} = user} = Users.update_user(user, update_attrs)
      assert user. == "some updated "
      assert user.name == "some updated name"
      assert user.password == "some updated password"
      assert user.surname == "some updated surname"
      assert user.username == "some updated username"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Users.update_user(user, @invalid_attrs)
      assert user == Users.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Users.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Users.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Users.change_user(user)
    end
  end
end
