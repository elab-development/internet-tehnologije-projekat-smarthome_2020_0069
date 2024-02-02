defmodule SmartHomeApi.Cameras do
  @moduledoc """
  The Cameras context.
  """

  import Ecto.Query, warn: false
  alias Hex.API.User
  alias SmartHomeApi.Devices.Device
  alias SmartHomeApi.Locations.Location
  alias SmartHomeApi.UserRoles.UserRole
  alias SmartHomeApi.Repo

  alias SmartHomeApi.Cameras.Camera

  @doc """
  Returns the list of cameras.

  ## Examples

      iex> list_cameras()
      [%Camera{}, ...]

  """
  def list_cameras(user_id, page_number, page_size) do
    query =
      from c in Camera,
        join: d in Device,
        on: c.device_id == d.id,
        join: l in Location,
        on: l.id == d.location_id,
        join: ur in UserRole,
        on: l.id == ur.location_id,
        where: ur.user_id == ^user_id,
        select: %{
          flashlight: c.flashlight,
          resolution: c.resolution,
          timer: c.timer,
          iso: c.iso,
          autofocus: c.autofocus,
          zoom: c.zoom,
          device_id: c.device_id,
          state: d.state,
          place: d.place
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
    |> offset(^((page_number_integer - 1) * page_size_integer))
  end

  @doc """
  Gets a single camera.

  Raises `Ecto.NoResultsError` if the Camera does not exist.

  ## Examples

      iex> get_camera!(123)
      %Camera{}

      iex> get_camera!(456)
      ** (Ecto.NoResultsError)

  """
  def get_camera!(id), do: Repo.get!(Camera, id)

  def get_joined_camera!(user_id, device_id) do
    query =
      from c in Camera,
        join: d in Device,
        on: c.device_id == d.id,
        join: l in Location,
        on: d.location_id == l.id,
        join: ur in UserRole,
        on: ur.location_id == l.id,
        where: d.id == ^device_id and ur.user_id == ^user_id,
        select: %{
          autofocus: c.autofocus,
          flashlight: c.flashlight,
          iso: c.iso,
          resolution: c.resolution,
          timer: c.timer,
          zoom: c.zoom,
          user_id: ur.user_id,
          device_id: c.device_id,
          place: d.place,
          state: d.state,
          location_id: l.id
        }

    Repo.one(query)
  end

  @doc """
  Creates a camera.

  ## Examples

      iex> create_camera(%{field: value})
      {:ok, %Camera{}}

      iex> create_camera(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_camera(attrs \\ %{}) do
    %Camera{}
    |> Camera.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a camera.

  ## Examples

      iex> update_camera(camera, %{field: new_value})
      {:ok, %Camera{}}

      iex> update_camera(camera, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_camera(%Camera{} = camera, attrs) do
    camera
    |> Camera.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a camera.

  ## Examples

      iex> delete_camera(camera)
      {:ok, %Camera{}}

      iex> delete_camera(camera)
      {:error, %Ecto.Changeset{}}

  """
  def delete_camera(%Camera{} = camera) do
    Repo.delete(camera)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking camera changes.

  ## Examples

      iex> change_camera(camera)
      %Ecto.Changeset{data: %Camera{}}

  """
  def change_camera(%Camera{} = camera, attrs \\ %{}) do
    Camera.changeset(camera, attrs)
  end
end
