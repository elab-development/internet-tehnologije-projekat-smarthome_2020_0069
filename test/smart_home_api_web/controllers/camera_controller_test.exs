defmodule SmartHomeApiWeb.CameraControllerTest do
  use SmartHomeApiWeb.ConnCase

  import SmartHomeApi.CamerasFixtures

  alias SmartHomeApi.Cameras.Camera

  @create_attrs %{
    autofocus: true,
    flashlight: true,
    iso: 42,
    resolution: 42,
    timer: 42,
    zoom: 120.5
  }
  @update_attrs %{
    autofocus: false,
    flashlight: false,
    iso: 43,
    resolution: 43,
    timer: 43,
    zoom: 456.7
  }
  @invalid_attrs %{autofocus: nil, flashlight: nil, iso: nil, resolution: nil, timer: nil, zoom: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all cameras", %{conn: conn} do
      conn = get(conn, ~p"/api/cameras")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create camera" do
    test "renders camera when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/cameras", camera: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/cameras/#{id}")

      assert %{
               "id" => ^id,
               "autofocus" => true,
               "flashlight" => true,
               "iso" => 42,
               "resolution" => 42,
               "timer" => 42,
               "zoom" => 120.5
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/cameras", camera: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update camera" do
    setup [:create_camera]

    test "renders camera when data is valid", %{conn: conn, camera: %Camera{id: id} = camera} do
      conn = put(conn, ~p"/api/cameras/#{camera}", camera: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/cameras/#{id}")

      assert %{
               "id" => ^id,
               "autofocus" => false,
               "flashlight" => false,
               "iso" => 43,
               "resolution" => 43,
               "timer" => 43,
               "zoom" => 456.7
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, camera: camera} do
      conn = put(conn, ~p"/api/cameras/#{camera}", camera: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete camera" do
    setup [:create_camera]

    test "deletes chosen camera", %{conn: conn, camera: camera} do
      conn = delete(conn, ~p"/api/cameras/#{camera}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/cameras/#{camera}")
      end
    end
  end

  defp create_camera(_) do
    camera = camera_fixture()
    %{camera: camera}
  end
end
