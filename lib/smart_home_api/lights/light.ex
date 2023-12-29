defmodule SmartHomeApi.Lights.Light do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "lights" do
    field :light_power, :integer
    field :rgb_value, :integer
    field :device_id, :binary_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(light, attrs) do
    light
    |> cast(attrs, [:rgb_value, :light_power])
    |> validate_required([:rgb_value, :light_power])
  end
end
