defmodule SmartHomeApi.Roles do
  alias SmartHomeApi.Repo
  alias SmartHomeApi.Roles.Role
  import Ecto.Query, warn: false

  def get_role!(role_name) do
    Role
    |> where(role_name: ^role_name)
    |> Repo.one()
  end

end
