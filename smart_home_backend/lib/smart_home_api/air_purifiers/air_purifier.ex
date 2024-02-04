defmodule SmartHomeApi.AirPurifiers.AirPurifier do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:device_id, :binary_id, []}
  @foreign_key_type :binary_id
  @derive {Phoenix.Param, key: :device_id}
  schema "air_purifiers" do
    field :filter, :float
    field :pm10, :integer
    field :pm1_0, :integer
    field :pm2_5, :integer
    field :timer, :integer

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(air_purifier, attrs) do
    air_purifier
    |> cast(attrs, [:device_id, :filter, :timer, :pm1_0, :pm2_5, :pm10])
    |> validate_required([])
  end
end
