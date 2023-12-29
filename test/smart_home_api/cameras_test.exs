defmodule SmartHomeApi.CamerasTest do
  use SmartHomeApi.DataCase

  alias SmartHomeApi.Cameras

  describe "cameras" do
    alias SmartHomeApi.Cameras.Camera

    import SmartHomeApi.CamerasFixtures

    @invalid_attrs %{autofocus: nil, flashlight: nil, iso: nil, resolution: nil, timer: nil, zoom: nil}

    test "list_cameras/0 returns all cameras" do
      camera = camera_fixture()
      assert Cameras.list_cameras() == [camera]
    end

    test "get_camera!/1 returns the camera with given id" do
      camera = camera_fixture()
      assert Cameras.get_camera!(camera.id) == camera
    end

    test "create_camera/1 with valid data creates a camera" do
      valid_attrs = %{autofocus: true, flashlight: true, iso: 42, resolution: 42, timer: 42, zoom: 120.5}

      assert {:ok, %Camera{} = camera} = Cameras.create_camera(valid_attrs)
      assert camera.autofocus == true
      assert camera.flashlight == true
      assert camera.iso == 42
      assert camera.resolution == 42
      assert camera.timer == 42
      assert camera.zoom == 120.5
    end

    test "create_camera/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Cameras.create_camera(@invalid_attrs)
    end

    test "update_camera/2 with valid data updates the camera" do
      camera = camera_fixture()
      update_attrs = %{autofocus: false, flashlight: false, iso: 43, resolution: 43, timer: 43, zoom: 456.7}

      assert {:ok, %Camera{} = camera} = Cameras.update_camera(camera, update_attrs)
      assert camera.autofocus == false
      assert camera.flashlight == false
      assert camera.iso == 43
      assert camera.resolution == 43
      assert camera.timer == 43
      assert camera.zoom == 456.7
    end

    test "update_camera/2 with invalid data returns error changeset" do
      camera = camera_fixture()
      assert {:error, %Ecto.Changeset{}} = Cameras.update_camera(camera, @invalid_attrs)
      assert camera == Cameras.get_camera!(camera.id)
    end

    test "delete_camera/1 deletes the camera" do
      camera = camera_fixture()
      assert {:ok, %Camera{}} = Cameras.delete_camera(camera)
      assert_raise Ecto.NoResultsError, fn -> Cameras.get_camera!(camera.id) end
    end

    test "change_camera/1 returns a camera changeset" do
      camera = camera_fixture()
      assert %Ecto.Changeset{} = Cameras.change_camera(camera)
    end
  end
end
