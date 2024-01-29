defmodule SmartHomeApi.Repo.Migrations.UniqueUsernameConstraint do
  use Ecto.Migration

  def change do
    execute ("ALTER TABLE users ADD UNIQUE (username)")
  end
end
