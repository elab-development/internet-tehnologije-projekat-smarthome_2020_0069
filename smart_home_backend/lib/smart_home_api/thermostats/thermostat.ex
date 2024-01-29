defmodule SmartHomeApi.Thermostats.Thermostat do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:device_id, :binary_id, autogenerate: false}
  @foreign_key_type :binary_id
  @derive {Phoenix.Param, key: :device_id}
  schema "thermostats" do
    field :humidity, :float
    field :temperature, :float
    field :timer, :integer

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(thermostat, attrs) do
    thermostat
    |> cast(attrs, [:device_id, :temperature, :timer, :humidity])
    |> validate_required([:temperature, :humidity])
  end
end
