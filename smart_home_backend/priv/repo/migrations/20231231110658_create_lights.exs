defmodule SmartHomeApi.Repo.Migrations.CreateLights do
  use Ecto.Migration

  def change do
    create table(:lights, primary_key: false) do
      add :rgb_color, :integer
      add :light_level, :integer
      add :device_id, references(:devices, on_delete: :nothing, type: :binary_id), primary_key: true

      timestamps(type: :utc_datetime)
    end

    create index(:lights, [:device_id])
  end
end
