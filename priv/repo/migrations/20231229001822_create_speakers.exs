defmodule SmartHomeApi.Repo.Migrations.CreateSpeakers do
  use Ecto.Migration

  def change do
    create table(:speakers, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :bass, :integer
      add :battery, :float
      add :volume, :integer
      add :device_id, references(:devices, on_delete: :nothing, type: :binary_id)

      timestamps(type: :utc_datetime)
    end

    create index(:speakers, [:device_id])
  end
end
