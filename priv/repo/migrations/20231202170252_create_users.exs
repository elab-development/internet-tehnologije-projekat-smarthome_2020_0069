defmodule SmartHomeApi.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :surname, :string
      add :username, :string
      add :password, :string

      timestamps(type: :utc_datetime)
    end
  end
end
