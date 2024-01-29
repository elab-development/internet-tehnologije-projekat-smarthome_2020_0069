defmodule SmartHomeApi.Repo.Migrations.CreateSpeakers do
  use Ecto.Migration

  def change do
    create table(:speakers, primary_key: false) do
      add :volume, :integer
      add :bass, :integer
      add :battery, :integer
      add :device_id, references(:devices, on_delete: :nothing, type: :binary_id), primary_key: true

      timestamps(type: :utc_datetime)
    end

    create index(:speakers, [:device_id])
  end
end
