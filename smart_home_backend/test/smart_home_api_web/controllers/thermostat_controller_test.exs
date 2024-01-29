defmodule SmartHomeApiWeb.ThermostatControllerTest do
  use SmartHomeApiWeb.ConnCase

  import SmartHomeApi.ThermostatsFixtures

  alias SmartHomeApi.Thermostats.Thermostat

  @create_attrs %{
    humidity: 120.5,
    temperature: 120.5,
    timer: 42
  }
  @update_attrs %{
    humidity: 456.7,
    temperature: 456.7,
    timer: 43
  }
  @invalid_attrs %{humidity: nil, temperature: nil, timer: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all thermostats", %{conn: conn} do
      conn = get(conn, ~p"/api/thermostats")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create thermostat" do
    test "renders thermostat when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/thermostats", thermostat: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/thermostats/#{id}")

      assert %{
               "id" => ^id,
               "humidity" => 120.5,
               "temperature" => 120.5,
               "timer" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/thermostats", thermostat: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update thermostat" do
    setup [:create_thermostat]

    test "renders thermostat when data is valid", %{conn: conn, thermostat: %Thermostat{id: id} = thermostat} do
      conn = put(conn, ~p"/api/thermostats/#{thermostat}", thermostat: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/thermostats/#{id}")

      assert %{
               "id" => ^id,
               "humidity" => 456.7,
               "temperature" => 456.7,
               "timer" => 43
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, thermostat: thermostat} do
      conn = put(conn, ~p"/api/thermostats/#{thermostat}", thermostat: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete thermostat" do
    setup [:create_thermostat]

    test "deletes chosen thermostat", %{conn: conn, thermostat: thermostat} do
      conn = delete(conn, ~p"/api/thermostats/#{thermostat}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/thermostats/#{thermostat}")
      end
    end
  end

  defp create_thermostat(_) do
    thermostat = thermostat_fixture()
    %{thermostat: thermostat}
  end
end
