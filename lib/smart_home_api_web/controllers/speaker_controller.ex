defmodule SmartHomeApiWeb.SpeakerController do
  use SmartHomeApiWeb, :controller

  alias SmartHomeApi.Speakers
  alias SmartHomeApi.Speakers.Speaker

  action_fallback SmartHomeApiWeb.FallbackController

  def index(conn, _params) do
    speakers = Speakers.list_speakers()
    render(conn, :index, speakers: speakers)
  end

  def create(conn, %{"speaker" => speaker_params}) do
    with {:ok, %Speaker{} = speaker} <- Speakers.create_speaker(speaker_params) do
      conn
      |> put_status(:created)
      |> render(:show, speaker: speaker)
    end
  end

  def show(conn, %{"id" => id}) do
    speaker = Speakers.get_speaker!(id)
    render(conn, :show, speaker: speaker)
  end

  def update(conn, %{"id" => id, "speaker" => speaker_params}) do
    speaker = Speakers.get_speaker!(id)

    with {:ok, %Speaker{} = speaker} <- Speakers.update_speaker(speaker, speaker_params) do
      render(conn, :show, speaker: speaker)
    end
  end

  def delete(conn, %{"id" => id}) do
    speaker = Speakers.get_speaker!(id)

    with {:ok, %Speaker{}} <- Speakers.delete_speaker(speaker) do
      send_resp(conn, :no_content, "")
    end
  end
end
