defmodule SmartHomeApi.Repo.Migrations.AlterTableDevices do
  use Ecto.Migration

  def change do
    alter table(:devices) do
      add :geolocation, :string
      remove :room
      add :place, :string
    end
  end
end
