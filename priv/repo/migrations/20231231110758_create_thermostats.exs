defmodule SmartHomeApi.Repo.Migrations.CreateThermostats do
  use Ecto.Migration

  def change do
    create table(:thermostats, primary_key: false) do
      add :temperature, :float
      add :timer, :integer
      add :humidity, :float
      add :device_id, references(:devices, on_delete: :nothing, type: :binary_id), primary_key: true

      timestamps(type: :utc_datetime)
    end

    create index(:thermostats, [:device_id])
  end
end
