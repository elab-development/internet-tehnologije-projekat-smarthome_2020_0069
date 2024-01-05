defmodule SmartHomeApi.Devices.Device do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  @derive {Jason.Encoder, except: [:__meta__]}
  schema "devices" do
    field :place, :string
    field :state, :string
    field :user_id, :binary_id
    field :geolocation, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(device, attrs) do
    device
    |> cast(attrs, [:place, :state, :geolocation, :user_id])
    |> validate_required([:place, :state])
  end
end
