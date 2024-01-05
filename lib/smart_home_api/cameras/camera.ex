defmodule SmartHomeApi.Cameras.Camera do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "cameras" do
    field :autofocus, :boolean, default: false
    field :flashlight, :boolean, default: false
    field :iso, :integer
    field :resolution, :integer
    field :timer, :integer
    field :zoom, :float
    field :device_id, :binary_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(camera, attrs) do
    camera
    |> cast(attrs, [:device_id, :flashlight, :resolution, :timer, :iso, :autofocus, :zoom])
    |> validate_required([:flashlight, :resolution, :timer, :iso, :autofocus, :zoom])
  end
end
