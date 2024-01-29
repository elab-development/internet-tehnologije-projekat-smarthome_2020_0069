defmodule MyApp.Repo.Migrations.CascadeDelete do
  use Ecto.Migration

  def change do
    drop constraint(:thermostats, :thermostats_device_id_fkey)

    alter table(:thermostats) do
      modify :device_id, references(:devices, type: :binary_id, on_delete: :delete_all)
    end

    drop constraint(:cameras, :cameras_device_id_fkey)

    alter table(:cameras) do
      modify :device_id, references(:devices, type: :binary_id, on_delete: :delete_all)
    end

    drop constraint(:air_purifiers, :air_purifiers_device_id_fkey)

    alter table(:air_purifiers) do
      modify :device_id, references(:devices, type: :binary_id, on_delete: :delete_all)
    end

    drop constraint(:speakers, :speakers_device_id_fkey)

    alter table(:speakers) do
      modify :device_id, references(:devices, type: :binary_id, on_delete: :delete_all)
    end

    drop constraint(:lights, :lights_device_id_fkey)

    alter table(:lights) do
      modify :device_id, references(:devices, type: :binary_id, on_delete: :delete_all)
    end
  end
end
