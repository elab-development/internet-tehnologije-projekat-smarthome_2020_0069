defmodule SmartHomeApi.AirPurifiers do
  @moduledoc """
  The AirPurifiers context.
  """

  import Ecto.Query, warn: false
  alias SmartHomeApi.Repo

  alias SmartHomeApi.AirPurifiers.AirPurifier

  @doc """
  Returns the list of air_purifiers.

  ## Examples

      iex> list_air_purifiers()
      [%AirPurifier{}, ...]

  """
  def list_air_purifiers do
    Repo.all(AirPurifier)
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
