defmodule SmartHomeApi.Lights.Light do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:device_id, :binary_id, []}
  @foreign_key_type :binary_id
  @derive {Phoenix.Param, key: :device_id}
  schema "lights" do
    field :light_level, :integer
    field :rgb_color, :string
    field :light_state, :boolean

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(light, attrs) do
    light
    |> cast(attrs, [:device_id, :rgb_color, :light_level, :light_state])
    |> validate_required([:rgb_color, :light_level])
  end
end
