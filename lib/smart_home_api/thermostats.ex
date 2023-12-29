defmodule SmartHomeApi.Thermostats do
  @moduledoc """
  The Thermostats context.
  """

  import Ecto.Query, warn: false
  alias SmartHomeApi.Repo

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
    thermostat
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
