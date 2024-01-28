defmodule SmartHomeApi.UserRoles.UserRole do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key false
  @derive {Jason.Encoder, except: [:__meta__]}
  schema "user_roles" do
    belongs_to :role, SmartHomeApi.Roles.Role, primary_key: false, references: :id, type: :binary_id
    belongs_to :user, SmartHomeApi.Users.User, primary_key: true, references: :id, type: :binary_id
    belongs_to :location, SmartHomeApi.Locations.Location, primary_key: true, references: :id, type: :binary_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user_role, attrs) do
    user_role
    |> cast(attrs, [:user_id, :location_id, :role])
    |> validate_required([:role])
  end
end
