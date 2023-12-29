defmodule SmartHomeApi.LightsTest do
  use SmartHomeApi.DataCase

  alias SmartHomeApi.Lights

  describe "lights" do
    alias SmartHomeApi.Lights.Light

    import SmartHomeApi.LightsFixtures

    @invalid_attrs %{light_power: nil, rgb_value: nil}

    test "list_lights/0 returns all lights" do
      light = light_fixture()
      assert Lights.list_lights() == [light]
    end

    test "get_light!/1 returns the light with given id" do
      light = light_fixture()
      assert Lights.get_light!(light.id) == light
    end

    test "create_light/1 with valid data creates a light" do
      valid_attrs = %{light_power: 42, rgb_value: 42}

      assert {:ok, %Light{} = light} = Lights.create_light(valid_attrs)
      assert light.light_power == 42
      assert light.rgb_value == 42
    end

    test "create_light/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Lights.create_light(@invalid_attrs)
    end

    test "update_light/2 with valid data updates the light" do
      light = light_fixture()
      update_attrs = %{light_power: 43, rgb_value: 43}

      assert {:ok, %Light{} = light} = Lights.update_light(light, update_attrs)
      assert light.light_power == 43
      assert light.rgb_value == 43
    end

    test "update_light/2 with invalid data returns error changeset" do
      light = light_fixture()
      assert {:error, %Ecto.Changeset{}} = Lights.update_light(light, @invalid_attrs)
      assert light == Lights.get_light!(light.id)
    end

    test "delete_light/1 deletes the light" do
      light = light_fixture()
      assert {:ok, %Light{}} = Lights.delete_light(light)
      assert_raise Ecto.NoResultsError, fn -> Lights.get_light!(light.id) end
    end

    test "change_light/1 returns a light changeset" do
      light = light_fixture()
      assert %Ecto.Changeset{} = Lights.change_light(light)
    end
  end
end
