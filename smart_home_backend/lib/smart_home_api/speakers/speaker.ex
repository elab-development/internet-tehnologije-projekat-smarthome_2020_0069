defmodule SmartHomeApi.Speakers.Speaker do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:device_id, :binary_id, []}
  @foreign_key_type :binary_id
  @derive {Phoenix.Param, key: :device_id}
  schema "speakers" do
    field :bass, :integer
    field :battery, :integer
    field :volume, :integer
    field :song, :string
    field :author, :string
    field :image_url, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(speaker, attrs) do
    speaker
    |> cast(attrs, [:device_id, :volume, :bass, :battery, :song, :author, :image_url])
    |> validate_required([:volume, :bass, :battery])
  end
end
