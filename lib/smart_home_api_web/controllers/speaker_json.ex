defmodule SmartHomeApiWeb.SpeakerJSON do
  alias SmartHomeApi.Speakers.Speaker

  @doc """
  Renders a list of speakers.
  """
  def index(%{speakers: speakers}) do
    %{data: for(speaker <- speakers, do: data(speaker))}
  end

  @doc """
  Renders a single speaker.
  """
  def show(%{speaker: speaker}) do
    %{data: data(speaker)}
  end

  defp data(%Speaker{} = speaker) do
    %{
      id: speaker.id,
      bass: speaker.bass,
      battery: speaker.battery,
      volume: speaker.volume
    }
  end
end
