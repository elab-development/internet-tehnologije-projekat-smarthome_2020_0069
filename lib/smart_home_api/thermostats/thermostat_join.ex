defmodule SmartHomeApi.Thermostats.ThermostatJoin do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:device_id, :binary_id, []}
  @foreign_key_type :binary_id
  @derive {Phoenix.Param, key: :device_id}
  schema "thermostats" do
    field :humidity, :float
    field :temperature, :float
    field :timer, :integer
    field :user_id, :integer
    field :place, :string
    field :geolocation, :string
    field :state, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(thermostat, attrs) do
    thermostat
    |> cast(attrs, [:temperature, :timer, :humidity])
    |> validate_required([:temperature, :timer, :humidity])
  end
end
