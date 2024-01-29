defmodule SmartHomeApi.Repo.Migrations.CreateRole do
  use Ecto.Migration

  def change do
    create table(:roles, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :role_name, :string

      timestamps(type: :utc_datetime)
    end
    alter table(:user_roles) do
      remove :role
      add :role, references(:roles, on_delete: :nothing, type: :binary_id)
    end

  end
end
