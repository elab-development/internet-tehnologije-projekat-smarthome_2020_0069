defmodule SmartHomeApi.Repo.Migrations.AlterTableLights do
  use Ecto.Migration

  def change do
    alter table(:lights) do
      remove :rgb_color
      add :rgb_color, :string
    end
  end

end
