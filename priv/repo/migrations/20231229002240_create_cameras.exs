defmodule SmartHomeApi.Repo.Migrations.CreateCameras do
  use Ecto.Migration

  def change do
    create table(:cameras, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :flashlight, :boolean, default: false, null: false
      add :resolution, :integer
      add :timer, :integer
      add :iso, :integer
      add :autofocus, :boolean, default: false, null: false
      add :zoom, :float
      add :device_id, references(:devices, on_delete: :nothing, type: :binary_id)

      timestamps(type: :utc_datetime)
    end

    create index(:cameras, [:device_id])
  end
end
