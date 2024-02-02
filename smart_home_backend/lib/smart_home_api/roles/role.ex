defmodule SmartHomeApi.Roles.Role do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @derive {Jason.Encoder, except: [:__meta__]}
  schema "roles" do
    field :role_name, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(role, attrs) do
    role
    |> cast(attrs, [:id, :role_name])
    |> validate_required([:role])
    |> unique_constraint(:role_name, name: :role_name_key)
  end
end
