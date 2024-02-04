defmodule SmartHomeApi.Cameras.Camera do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:device_id, :binary_id, []}
  @foreign_key_type :binary_id
  @derive {Phoenix.Param, key: :device_id}
  schema "cameras" do
    field :autofocus, :boolean, default: false
    field :flashlight, :boolean, default: false
    field :iso, :integer
    field :resolution, :integer
    field :timer, :integer
    field :zoom, :float

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(camera, attrs) do
    camera
    |> cast(attrs, [:device_id, :flashlight, :resolution, :iso, :autofocus, :zoom])
    |> validate_required([])
  end
end
