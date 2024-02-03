defmodule SmartHomeApiWeb.AirPurifierView do
  use SmartHomeApiWeb, :view

  def render("show.json", %{air_purifier: air_purifier}) do
    %{
      id: air_purifier.device_id,
      timer: air_purifier.timer,
      filter: air_purifier.filter,
      pm10: air_purifier.pm10,
      pm1_0: air_purifier.pm1_0,
      pm2_5: air_purifier.pm2_5,
      device_id: air_purifier.device_id,
      place: air_purifier.place
    }

  end

  def render("index.json", %{air_purifiers: air_purifiers}) do
    %{air_purifiers: air_purifiers}
  end

  def render("patch.json", %{air_purifier: air_purifier}) do
    %{
      id: air_purifier.device_id,
      timer: air_purifier.timer,
      filter: air_purifier.filter,
      pm10: air_purifier.pm10,
      pm1_0: air_purifier.pm1_0,
      pm2_5: air_purifier.pm2_5
    }
  end

  def render("create.json", %{air_purifier: air_purifier}) do
    %{
      air_purifier: air_purifier
    }
  end
end
