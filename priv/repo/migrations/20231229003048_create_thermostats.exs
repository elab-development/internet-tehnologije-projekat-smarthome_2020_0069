defmodule SmartHomeApi.Repo.Migrations.CreateThermostats do
  use Ecto.Migration

  def change do
    create table(:thermostats, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :temperature, :float
      add :humidity, :float
      add :timer, :integer
      add :device_id, references(:devices, on_delete: :nothing, type: :binary_id)

      timestamps(type: :utc_datetime)
    end

    create index(:thermostats, [:device_id])
  end
end
