defmodule MyApp.Repo.Migrations.AlterTableLights do
  use Ecto.Migration

  def change do

    alter table(:lights) do
      add :light_state, :boolean
    end
  end
end
