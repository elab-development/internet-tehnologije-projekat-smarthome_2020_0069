defmodule SmartHomeApiWeb.SpeakerControllerTest do
  use SmartHomeApiWeb.ConnCase

  import SmartHomeApi.SpeakersFixtures

  alias SmartHomeApi.Speakers.Speaker

  @create_attrs %{
    bass: 42,
    battery: 120.5,
    volume: 42
  }
  @update_attrs %{
    bass: 43,
    battery: 456.7,
    volume: 43
  }
  @invalid_attrs %{bass: nil, battery: nil, volume: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all speakers", %{conn: conn} do
      conn = get(conn, ~p"/api/speakers")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create speaker" do
    test "renders speaker when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/speakers", speaker: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/speakers/#{id}")

      assert %{
               "id" => ^id,
               "bass" => 42,
               "battery" => 120.5,
               "volume" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/speakers", speaker: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update speaker" do
    setup [:create_speaker]

    test "renders speaker when data is valid", %{conn: conn, speaker: %Speaker{id: id} = speaker} do
      conn = put(conn, ~p"/api/speakers/#{speaker}", speaker: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/speakers/#{id}")

      assert %{
               "id" => ^id,
               "bass" => 43,
               "battery" => 456.7,
               "volume" => 43
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, speaker: speaker} do
      conn = put(conn, ~p"/api/speakers/#{speaker}", speaker: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete speaker" do
    setup [:create_speaker]

    test "deletes chosen speaker", %{conn: conn, speaker: speaker} do
      conn = delete(conn, ~p"/api/speakers/#{speaker}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/speakers/#{speaker}")
      end
    end
  end

  defp create_speaker(_) do
    speaker = speaker_fixture()
    %{speaker: speaker}
  end
end
