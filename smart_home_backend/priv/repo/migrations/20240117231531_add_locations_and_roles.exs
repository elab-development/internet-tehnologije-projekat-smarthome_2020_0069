defmodule SmartHomeApi.Repo.Migrations.AddLocationsAndRoles do
  use Ecto.Migration

  def change do
    create table(:locations, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :city, :string
      add :country, :string
      add :address, :string
      add :device_id, references(:devices, on_delete: :delete_all, type: :binary_id)

      timestamps(type: :utc_datetime)
    end

    create table(:user_roles, primary_key: false) do
      add :role, :string
      add :user_id, references(:users, on_delete: :nothing, type: :binary_id)
      add :location_id, references(:locations, on_delete: :nothing, type: :binary_id)

      timestamps(type: :utc_datetime)
    end

    alter table(:devices) do
      remove :user_id
      add :location_id, references(:locations, on_delete: :nothing, type: :binary_id)
    end
  end
end
