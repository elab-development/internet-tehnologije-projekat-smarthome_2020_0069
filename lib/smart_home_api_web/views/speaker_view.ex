defmodule SmartHomeApiWeb.SpeakerView do
  use SmartHomeApiWeb, :view

  def render("show.json", %{speaker: speaker}) do
    %{
      id: speaker.device_id,
      bass: speaker.bass,
      battery: speaker.battery,
      volume: speaker.volume,
      state: speaker.state,
      user_id: speaker.user_id,
      place: speaker.place
    }
  end

  def render("patch.json", %{speaker: speaker}) do
    %{
      id: speaker.device_id,
      bass: speaker.bass,
      battery: speaker.battery,
      volume: speaker.volume,
    }
  end

  def render("create.json", %{speaker: speaker}) do
    %{
      speaker: speaker
    }
  end
end
