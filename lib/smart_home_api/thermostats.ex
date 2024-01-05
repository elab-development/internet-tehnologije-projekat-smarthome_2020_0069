defmodule SmartHomeApi.Thermostats do
  @moduledoc """
  The Thermostats context.
  """

  import Ecto.Query, warn: false
  alias SmartHomeApi.Repo
  alias SmartHomeApi.Devices.Device
  alias SmartHomeApi.Thermostats.Thermostat
  @doc """
  Returns the list of thermostats.

  ## Examples

      iex> list_thermostats()
      [%Thermostat{}, ...]

  """
  def list_thermostats do
    Repo.all(Thermostat)
  end

  @doc """
  Gets a single thermostat.

  Raises `Ecto.NoResultsError` if the Thermostat does not exist.

  ## Examples

      iex> get_thermostat!(123)
      %Thermostat{}

      iex> get_thermostat!(456)
      ** (Ecto.NoResultsError)

  """
  def get_thermostat!(id), do: Repo.get!(Thermostat, id)


  def get_full_thermostat(id) do
    query = from t in Thermostat,
      join: d in Device, on: t.device_id == d.id,
      where: t.device_id == ^id,
      select: %{
        humidity: t.humidity,
        temperature: t.temperature,
        timer: t.timer,
        device_id: t.device_id,
        user_id: d.user_id,
        geolocation: d.geolocation,
        place: d.place,
        state: d.state
      }
    Repo.one(query)
  end

  @doc """
  Creates a thermostat.

  ## Examples

      iex> create_thermostat(%{field: value})
      {:ok, %Thermostat{}}

      iex> create_thermostat(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_thermostat(attrs \\ %{}) do
    %Thermostat{}
    |> Thermostat.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a thermostat.

  ## Examples

      iex> update_thermostat(thermostat, %{field: new_value})
      {:ok, %Thermostat{}}

      iex> update_thermostat(thermostat, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_thermostat(%Thermostat{} = thermostat, attrs) do
    get_thermostat!(thermostat.device_id)
    |> Thermostat.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a thermostat.

  ## Examples

      iex> delete_thermostat(thermostat)
      {:ok, %Thermostat{}}

      iex> delete_thermostat(thermostat)
      {:error, %Ecto.Changeset{}}

  """
  def delete_thermostat(%Thermostat{} = thermostat) do
    Repo.delete(thermostat)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking thermostat changes.

  ## Examples

      iex> change_thermostat(thermostat)
      %Ecto.Changeset{data: %Thermostat{}}

  """
  def change_thermostat(%Thermostat{} = thermostat, attrs \\ %{}) do
    Thermostat.changeset(thermostat, attrs)
  end
end
