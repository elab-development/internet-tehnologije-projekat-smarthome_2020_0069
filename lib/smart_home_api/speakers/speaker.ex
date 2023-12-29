defmodule SmartHomeApi.Speakers.Speaker do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "speakers" do
    field :bass, :integer
    field :battery, :float
    field :volume, :integer
    field :device_id, :binary_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(speaker, attrs) do
    speaker
    |> cast(attrs, [:bass, :battery, :volume])
    |> validate_required([:bass, :battery, :volume])
  end
end
