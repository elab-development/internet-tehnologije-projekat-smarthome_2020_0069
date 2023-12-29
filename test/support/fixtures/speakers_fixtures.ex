defmodule SmartHomeApi.SpeakersFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `SmartHomeApi.Speakers` context.
  """

  @doc """
  Generate a speaker.
  """
  def speaker_fixture(attrs \\ %{}) do
    {:ok, speaker} =
      attrs
      |> Enum.into(%{
        bass: 42,
        battery: 120.5,
        volume: 42
      })
      |> SmartHomeApi.Speakers.create_speaker()

    speaker
  end
end
