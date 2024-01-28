defmodule SmartHomeApi.Locations.Location do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, []}
  schema "locations" do
    field :name, :string
    field :city, :string
    field :address, :string
    field :country, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(light, attrs) do
    light
    |> cast(attrs, [:id, :name, :city, :address, :country])
    |> validate_required([:name, :city])
  end
end
