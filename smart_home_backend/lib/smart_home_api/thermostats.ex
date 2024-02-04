defmodule SmartHomeApi.Thermostats do
  @moduledoc """
  The Thermostats context.
  """

  import Ecto.Query, warn: false
  alias SmartHomeApi.Repo
  alias SmartHomeApi.Thermostats.Thermostat
  alias SmartHomeApi.Devices.Device
  alias SmartHomeApi.Locations.Location
  alias SmartHomeApi.UserRoles.UserRole

  @doc """
  Returns the list of thermostats.

  ## Examples

      iex> list_thermostats()
      [%Thermostat{}, ...]

  """
  def list_thermostats(user_id, page_number, page_size) do
    query =
      from(t in Thermostat,
        join: d in Device,
        on: t.device_id == d.id,
        join: l in Location,
        on: l.id == d.location_id,
        join: ur in UserRole,
        on: l.id == ur.location_id,
        where: ur.user_id == ^user_id,
        select: %{
          temperature: t.temperature,
          humidity: t.humidity,
          timer: t.timer,
          device_id: t.device_id,
          state: d.state,
          place: d.place
        },
        order_by: [asc: t.device_id]

      )

    query
    |> paginate(page_number, page_size)
    |> Repo.all()
  end

  defp paginate(query, page_number, page_size) do
    page_number_integer = String.to_integer(page_number)
    page_size_integer = String.to_integer(page_size)

    query
    |> limit(^page_size_integer)
    |> offset(^((page_number_integer - 1) * page_size_integer))
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

  def get_full_thermostat(user_id, device_id) do
    query =
      from(t in Thermostat,
        join: d in Device,
        on: t.device_id == d.id,
        join: l in Location,
        on: d.location_id == l.id,
        join: ur in UserRole,
        on: ur.location_id == l.id,
        where: d.id == ^device_id and ur.user_id == ^user_id,
        select: %{
          humidity: t.humidity,
          temperature: t.temperature,
          timer: t.timer,
          device_id: t.device_id,
          user_id: ur.user_id,
          place: d.place,
          state: d.state,
          location_id: l.id
        }
      )

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
