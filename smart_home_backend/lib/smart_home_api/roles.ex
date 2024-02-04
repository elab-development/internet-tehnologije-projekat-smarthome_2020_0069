defmodule SmartHomeApi.Roles do
  alias SmartHomeApi.Repo
  alias SmartHomeApi.Roles.Role
  import Ecto.Query, warn: false

  def get_role!(role_name) do
    Role
    |> where(role_name: ^role_name)
    |> Repo.one()
  end

  def get_role_by_id!(role_id) do
    Role
    |> where(id: ^role_id)
    |> Repo.one()
  end

end
