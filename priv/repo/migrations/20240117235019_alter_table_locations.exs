defmodule SmartHomeApi.Repo.Migrations.AlterTableLocations do
  use Ecto.Migration

  def change do
    alter table(:locations, primary_key: false) do
      remove :device_id
    end
  end
end
