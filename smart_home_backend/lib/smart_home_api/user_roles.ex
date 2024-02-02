defmodule SmartHomeApi.UserRoles do
  @moduledoc """
  The Users context.
  """

  import Ecto.Query, warn: false
  alias SmartHomeApi.Roles.Role
  alias SmartHomeApi.UserRoles.UserRole
  alias SmartHomeApi.Repo

  alias SmartHomeApi.UserRoles.UserRole

  def get_user_role(user_id, location_id) do
    query = from ur in UserRole,
      join: r in Role, on: ur.role == r.id,
      where: ur.user_id == ^user_id and ur.location_id == ^location_id,
      select: %{
        user_id: ur.user_id,
        location_id: ur.location_id,
        role: r.role_name
      }
    Repo.one(query)
  end

  def create_user_role(attrs \\ %{}) do
    %UserRole{}
    |> UserRole.changeset(attrs)
    |> Repo.insert()
  end

  def update_user_role(%UserRole{} = user, attrs) do
    user
    |> UserRole.changeset(attrs)
    |> Repo.update()
  end


  def delete_user_role(%UserRole{} = user_role) do
    Repo.delete(user_role)
  end

end
