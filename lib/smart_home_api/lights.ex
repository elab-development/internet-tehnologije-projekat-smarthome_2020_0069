defmodule SmartHomeApi.Lights do
  @moduledoc """
  The Lights context.
  """

  import Ecto.Query, warn: false
  alias SmartHomeApi.Repo
  alias SmartHomeApi.Devices.Device
  alias SmartHomeApi.Locations.Location
  alias SmartHomeApi.UserRoles.UserRole

  alias SmartHomeApi.Lights.Light

  @doc """
  Returns the list of lights.

  ## Examples

      iex> list_lights()
      [%Light{}, ...]

  """
  def list_lights do
    Repo.all(Light)
  end

  @doc """
  Gets a single light.

  Raises `Ecto.NoResultsError` if the Light does not exist.

  ## Examples

      iex> get_light!(123)
      %Light{}

      iex> get_light!(456)
      ** (Ecto.NoResultsError)

  """
  def get_light!(id), do: Repo.get!(Light, id)

  def get_full_light(user_id, device_id) do
    query = from la in Light,
      join: d in Device, on: la.device_id == d.id,
      join: l in Location, on: d.location_id == l.id,
      join: ur in UserRole, on: ur.location_id == l.id,
      where: d.id == ^device_id and ur.user_id == ^user_id,
      select: %{
        light_level: la.light_level,
        rgb_color: la.rgb_color,
        device_id: la.device_id,
        user_id: ur.user_id,
        place: d.place,
        state: d.state,
        light_state: la.light_state
      }
    Repo.one(query)
  end

  @doc """
  Creates a light.

  ## Examples

      iex> create_light(%{field: value})
      {:ok, %Light{}}

      iex> create_light(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_light(attrs \\ %{}) do
    %Light{}
    |> Light.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a light.

  ## Examples

      iex> update_light(light, %{field: new_value})
      {:ok, %Light{}}

      iex> update_light(light, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_light(%Light{} = light, attrs) do
    light
    |> Light.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a light.

  ## Examples

      iex> delete_light(light)
      {:ok, %Light{}}

      iex> delete_light(light)
      {:error, %Ecto.Changeset{}}

  """
  def delete_light(%Light{} = light) do
    Repo.delete(light)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking light changes.

  ## Examples

      iex> change_light(light)
      %Ecto.Changeset{data: %Light{}}

  """
  def change_light(%Light{} = light, attrs \\ %{}) do
    Light.changeset(light, attrs)
  end
end
