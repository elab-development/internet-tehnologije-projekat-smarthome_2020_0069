defmodule SmartHomeApiWeb.AirPurifierJSON do
  alias SmartHomeApi.AirPurifiers.AirPurifier

  @doc """
  Renders a list of air_purifiers.
  """
  def index(%{air_purifiers: air_purifiers}) do
    %{data: for(air_purifier <- air_purifiers, do: data(air_purifier))}
  end

  @doc """
  Renders a single air_purifier.
  """
  def show(%{air_purifier: air_purifier}) do
    %{data: data(air_purifier)}
  end

  defp data(%AirPurifier{} = air_purifier) do
    %{
      id: air_purifier.id,
      filter: air_purifier.filter,
      pm1_0: air_purifier.pm1_0,
      pm2_5: air_purifier.pm2_5,
      pm10: air_purifier.pm10
    }
  end
end
