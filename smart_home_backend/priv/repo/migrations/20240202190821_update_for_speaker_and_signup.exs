defmodule SmartHomeApi.Repo.Migrations.UpdateForSpeakerAndSignup do
  use Ecto.Migration

  def change do
    alter table(:locations) do
      add :invitation_code, :string
    end

    alter table(:speakers) do
      add :song, :string
      add :author, :string
      add :image_url, :string
    end

  end
end
