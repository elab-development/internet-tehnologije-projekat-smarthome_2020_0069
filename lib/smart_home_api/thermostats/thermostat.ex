defmodule SmartHomeApi.Thermostats.Thermostat do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "thermostats" do
    field :humidity, :float
    field :temperature, :float
    field :timer, :integer
    field :device_id, :binary_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(thermostat, attrs) do
    thermostat
    |> cast(attrs, [:temperature, :humidity, :timer])
    |> validate_required([:temperature, :humidity, :timer])
  end
end
