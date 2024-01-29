defmodule SmartHomeApi.Repo.Migrations.AlterTableDevices do
  use Ecto.Migration

  def change do
    alter table(:devices) do
      remove :geolocation
    end
  end

end
