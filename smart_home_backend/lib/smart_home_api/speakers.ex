defmodule SmartHomeApi.Speakers do
  @moduledoc """
  The Speakers context.
  """

  import Ecto.Query, warn: false
  alias SmartHomeApi.Repo
  alias SmartHomeApi.Devices.Device
  alias SmartHomeApi.Locations.Location
  alias SmartHomeApi.UserRoles.UserRole
  alias SmartHomeApi.Speakers.Speaker

  @doc """
  Returns the list of speakers.

  ## Examples

      iex> list_speakers()
      [%Speaker{}, ...]

  """
  def list_speakers(user_id, page_number, page_size) do
    query =
      from s in Speaker,
        join: d in Device,
        on: s.device_id == d.id,
        join: l in Location,
        on: l.id == d.location_id,
        join: ur in UserRole,
        on: l.id == ur.location_id,
        where: ur.user_id == ^user_id,
        select: %{
          volume: s.volume,
          bass: s.bass,
          battery: s.battery,
          device_id: s.device_id,
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
  Gets a single speaker.

  Raises `Ecto.NoResultsError` if the Speaker does not exist.

  ## Examples

      iex> get_speaker!(123)
      %Speaker{}

      iex> get_speaker!(456)
      ** (Ecto.NoResultsError)

  """
  def get_speaker(id), do: Repo.get(Speaker, id)

  def get_full_speaker(user_id, device_id) do
    query =
      from s in Speaker,
        join: d in Device,
        on: s.device_id == d.id,
        join: l in Location,
        on: d.location_id == l.id,
        join: ur in UserRole,
        on: ur.location_id == l.id,
        where: d.id == ^device_id and ur.user_id == ^user_id,
        select: %{
          bass: s.bass,
          battery: s.battery,
          device_id: s.device_id,
          user_id: ur.user_id,
          place: d.place,
          state: d.state,
          volume: s.volume,
          location_id: l.id
        }

    Repo.one(query)
  end

  @doc """
  Creates a speaker.

  ## Examples

      iex> create_speaker(%{field: value})
      {:ok, %Speaker{}}

      iex> create_speaker(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_speaker(attrs \\ %{}) do
    %Speaker{}
    |> Speaker.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a speaker.

  ## Examples

      iex> update_speaker(speaker, %{field: new_value})
      {:ok, %Speaker{}}

      iex> update_speaker(speaker, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_speaker(%Speaker{} = speaker, attrs) do
    speaker
    |> Speaker.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a speaker.

  ## Examples

      iex> delete_speaker(speaker)
      {:ok, %Speaker{}}

      iex> delete_speaker(speaker)
      {:error, %Ecto.Changeset{}}

  """
  def delete_speaker(%Speaker{} = speaker) do
    Repo.delete(speaker)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking speaker changes.

  ## Examples

      iex> change_speaker(speaker)
      %Ecto.Changeset{data: %Speaker{}}

  """
  def change_speaker(%Speaker{} = speaker, attrs \\ %{}) do
    Speaker.changeset(speaker, attrs)
  end
end
