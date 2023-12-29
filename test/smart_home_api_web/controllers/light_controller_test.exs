defmodule SmartHomeApiWeb.LightControllerTest do
  use SmartHomeApiWeb.ConnCase

  import SmartHomeApi.LightsFixtures

  alias SmartHomeApi.Lights.Light

  @create_attrs %{
    light_power: 42,
    rgb_value: 42
  }
  @update_attrs %{
    light_power: 43,
    rgb_value: 43
  }
  @invalid_attrs %{light_power: nil, rgb_value: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all lights", %{conn: conn} do
      conn = get(conn, ~p"/api/lights")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create light" do
    test "renders light when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/lights", light: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/lights/#{id}")

      assert %{
               "id" => ^id,
               "light_power" => 42,
               "rgb_value" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/lights", light: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update light" do
    setup [:create_light]

    test "renders light when data is valid", %{conn: conn, light: %Light{id: id} = light} do
      conn = put(conn, ~p"/api/lights/#{light}", light: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/lights/#{id}")

      assert %{
               "id" => ^id,
               "light_power" => 43,
               "rgb_value" => 43
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, light: light} do
      conn = put(conn, ~p"/api/lights/#{light}", light: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete light" do
    setup [:create_light]

    test "deletes chosen light", %{conn: conn, light: light} do
      conn = delete(conn, ~p"/api/lights/#{light}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/lights/#{light}")
      end
    end
  end

  defp create_light(_) do
    light = light_fixture()
    %{light: light}
  end
end
