defmodule SmartHomeApi.Devices do
  @moduledoc """
  The Devices context.
  """

  import Ecto.Query, warn: false
  alias SmartHomeApi.Repo

  alias SmartHomeApi.Devices.Device
  alias SmartHomeApi.Locations.Location
  alias SmartHomeApi.UserRoles.UserRole

  @doc """
  Returns the list of devices.

  ## Examples

      iex> list_devices()
      [%Device{}, ...]

  """
  def list_devices(user_id, page_number, page_size) do
    query =
      from d in Device,
        join: l in Location,
        on: d.location_id == l.id,
        join: ur in UserRole,
        on: ur.location_id == l.id,
        where: ur.user_id == ^user_id,
        select: %{
          device_id: d.id,
          place: d.place,
          state: d.state,
          name: l.name,
          city: l.city,
          country: l.country,
          address: l.address,
          location_id: l.id
        }

    query
    |> paginate(page_number, page_size)
    |> Repo.all()
  end

  defp paginate(query, page_number, page_size) do
    page_number_integer = String.to_integer(page_number)
    page_size_integer = String.to_integer(page_size)

    query
    |> limit(^page_size_integer)
    |> offset(^((page_number_integer-1)*page_size_integer))
  end

  @doc """
  Gets a single device.

  Raises `Ecto.NoResultsError` if the Device does not exist.

  ## Examples

      iex> get_device!(123)
      %Device{}

      iex> get_device!(456)
      ** (Ecto.NoResultsError)

  """
  def get_device(id), do: Repo.get(Device, id)

  @doc """
  Creates a device.

  ## Examples

      iex> create_device(%{field: value})
      {:ok, %Device{}}

      iex> create_device(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_device(attrs \\ %{}) do
    %Device{}
    |> Device.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a device.

  ## Examples

      iex> update_device(device, %{field: new_value})
      {:ok, %Device{}}

      iex> update_device(device, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_device(%Device{} = device, attrs) do
    device
    |> Device.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a device.

  ## Examples

      iex> delete_device(device)
      {:ok, %Device{}}

      iex> delete_device(device)
      {:error, %Ecto.Changeset{}}

  """
  def delete_device(%Device{} = device) do
    Repo.delete(device)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking device changes.

  ## Examples

      iex> change_device(device)
      %Ecto.Changeset{data: %Device{}}

  """
  def change_device(%Device{} = device, attrs \\ %{}) do
    Device.changeset(device, attrs)
  end
end
