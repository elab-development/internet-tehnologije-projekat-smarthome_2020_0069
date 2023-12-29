defmodule SmartHomeApi.AirPurifiers.AirPurifier do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "air_purifiers" do
    field :filter, :float
    field :pm10, :integer
    field :pm1_0, :integer
    field :pm2_5, :integer
    field :device_id, :binary_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(air_purifier, attrs) do
    air_purifier
    |> cast(attrs, [:filter, :pm1_0, :pm2_5, :pm10])
    |> validate_required([:filter, :pm1_0, :pm2_5, :pm10])
  end
end
