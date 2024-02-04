defmodule SmartHomeApi.Locations do
  alias SmartHomeApi.Location
  alias SmartHomeApi.Locations.Location
  import Ecto.Query, warn: false
  alias SmartHomeApi.Repo

  def get_location_from_code!(invitation_code) do
    Location
    |> where(invitation_code: ^invitation_code)
    |> Repo.one()
  end

end
