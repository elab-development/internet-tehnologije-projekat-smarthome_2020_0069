defmodule SmartHomeApi.AirPurifiers do
  @moduledoc """
  The AirPurifiers context.
  """

  import Ecto.Query, warn: false
  alias SmartHomeApi.Repo

  alias SmartHomeApi.Devices.Device
  alias SmartHomeApi.Locations.Location
  alias SmartHomeApi.UserRoles.UserRole
  alias SmartHomeApi.AirPurifiers.AirPurifier

  @doc """
  Returns the list of air_purifiers.

  ## Examples

      iex> list_air_purifiers()
      [%AirPurifier{}, ...]

  """
  def list_air_purifiers(user_id, page_number, page_size) do
    query =
      from(ap in AirPurifier,
        join: d in Device,
        on: ap.device_id == d.id,
        join: l in Location,
        on: l.id == d.location_id,
        join: ur in UserRole,
        on: l.id == ur.location_id,
        where: ur.user_id == ^user_id,
        select: %{
          filter: ap.filter,
          pm10: ap.pm10,
          pm1_0: ap.pm1_0,
          pm2_5: ap.pm2_5,
          timer: ap.timer,
          state: d.state,
          place: d.place
        }
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
  Gets a single air_purifier.

  Raises `Ecto.NoResultsError` if the Air purifier does not exist.

  ## Examples

      iex> get_air_purifier!(123)
      %AirPurifier{}

      iex> get_air_purifier!(456)
      ** (Ecto.NoResultsError)

  """
  def get_air_purifier!(id), do: Repo.get!(AirPurifier, id)

  def get_full_air_purifier(user_id, device_id) do
    query =
      from(ap in AirPurifier,
        join: d in Device,
        on: ap.device_id == d.id,
        join: l in Location,
        on: l.id == d.location_id,
        join: ur in UserRole,
        on: l.id == ur.location_id,
        where: d.id == ^device_id and ur.user_id == ^user_id,
        select: %{
          filter: ap.filter,
          pm10: ap.pm10,
          pm1_0: ap.pm1_0,
          pm2_5: ap.pm2_5,
          timer: ap.timer,
          state: d.state,
          place: d.place,
          device_id: ap.device_id,
          location_id: l.id,
          user_id: ur.user_id
        },
        order_by: [asc: ap.device_id]
      )
      Repo.one(query)
  end

  @doc """
  Creates a air_purifier.

  ## Examples

      iex> create_air_purifier(%{field: value})
      {:ok, %AirPurifier{}}

      iex> create_air_purifier(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_air_purifier(attrs \\ %{}) do
    %AirPurifier{}
    |> AirPurifier.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a air_purifier.

  ## Examples

      iex> update_air_purifier(air_purifier, %{field: new_value})
      {:ok, %AirPurifier{}}

      iex> update_air_purifier(air_purifier, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_air_purifier(%AirPurifier{} = air_purifier, attrs) do
    air_purifier
    |> AirPurifier.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a air_purifier.

  ## Examples

      iex> delete_air_purifier(air_purifier)
      {:ok, %AirPurifier{}}

      iex> delete_air_purifier(air_purifier)
      {:error, %Ecto.Changeset{}}

  """
  def delete_air_purifier(%AirPurifier{} = air_purifier) do
    Repo.delete(air_purifier)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking air_purifier changes.

  ## Examples

      iex> change_air_purifier(air_purifier)
      %Ecto.Changeset{data: %AirPurifier{}}

  """
  def change_air_purifier(%AirPurifier{} = air_purifier, attrs \\ %{}) do
    AirPurifier.changeset(air_purifier, attrs)
  end
end
