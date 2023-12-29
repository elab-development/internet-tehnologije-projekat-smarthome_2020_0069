defmodule SmartHomeApiWeb.AirPurifierControllerTest do
  use SmartHomeApiWeb.ConnCase

  import SmartHomeApi.AirPurifiersFixtures

  alias SmartHomeApi.AirPurifiers.AirPurifier

  @create_attrs %{
    filter: 120.5,
    pm10: 42,
    pm1_0: 42,
    pm2_5: 42
  }
  @update_attrs %{
    filter: 456.7,
    pm10: 43,
    pm1_0: 43,
    pm2_5: 43
  }
  @invalid_attrs %{filter: nil, pm10: nil, pm1_0: nil, pm2_5: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all air_purifiers", %{conn: conn} do
      conn = get(conn, ~p"/api/air_purifiers")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create air_purifier" do
    test "renders air_purifier when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/air_purifiers", air_purifier: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/air_purifiers/#{id}")

      assert %{
               "id" => ^id,
               "filter" => 120.5,
               "pm10" => 42,
               "pm1_0" => 42,
               "pm2_5" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/air_purifiers", air_purifier: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update air_purifier" do
    setup [:create_air_purifier]

    test "renders air_purifier when data is valid", %{conn: conn, air_purifier: %AirPurifier{id: id} = air_purifier} do
      conn = put(conn, ~p"/api/air_purifiers/#{air_purifier}", air_purifier: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/air_purifiers/#{id}")

      assert %{
               "id" => ^id,
               "filter" => 456.7,
               "pm10" => 43,
               "pm1_0" => 43,
               "pm2_5" => 43
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, air_purifier: air_purifier} do
      conn = put(conn, ~p"/api/air_purifiers/#{air_purifier}", air_purifier: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete air_purifier" do
    setup [:create_air_purifier]

    test "deletes chosen air_purifier", %{conn: conn, air_purifier: air_purifier} do
      conn = delete(conn, ~p"/api/air_purifiers/#{air_purifier}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/air_purifiers/#{air_purifier}")
      end
    end
  end

  defp create_air_purifier(_) do
    air_purifier = air_purifier_fixture()
    %{air_purifier: air_purifier}
  end
end
