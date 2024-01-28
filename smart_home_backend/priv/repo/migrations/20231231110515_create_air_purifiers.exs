defmodule SmartHomeApi.Repo.Migrations.CreateAirPurifiers do
  use Ecto.Migration

  def change do
    create table(:air_purifiers, primary_key: false) do
      add :filter, :float
      add :timer, :integer
      add :pm1_0, :integer
      add :pm2_5, :integer
      add :pm10, :integer
      add :device_id, references(:devices, on_delete: :nothing, type: :binary_id), primary_key: true

      timestamps(type: :utc_datetime)
    end

    create index(:air_purifiers, [:device_id])
  end
end
