defmodule SmartHomeApi.AirPurifiersTest do
  use SmartHomeApi.DataCase

  alias SmartHomeApi.AirPurifiers

  describe "air_purifiers" do
    alias SmartHomeApi.AirPurifiers.AirPurifier

    import SmartHomeApi.AirPurifiersFixtures

    @invalid_attrs %{filter: nil, pm10: nil, pm1_0: nil, pm2_5: nil, timer: nil}

    test "list_air_purifiers/0 returns all air_purifiers" do
      air_purifier = air_purifier_fixture()
      assert AirPurifiers.list_air_purifiers() == [air_purifier]
    end

    test "get_air_purifier!/1 returns the air_purifier with given id" do
      air_purifier = air_purifier_fixture()
      assert AirPurifiers.get_air_purifier!(air_purifier.id) == air_purifier
    end

    test "create_air_purifier/1 with valid data creates a air_purifier" do
      valid_attrs = %{filter: 120.5, pm10: 42, pm1_0: 42, pm2_5: 42, timer: 42}

      assert {:ok, %AirPurifier{} = air_purifier} = AirPurifiers.create_air_purifier(valid_attrs)
      assert air_purifier.filter == 120.5
      assert air_purifier.pm10 == 42
      assert air_purifier.pm1_0 == 42
      assert air_purifier.pm2_5 == 42
      assert air_purifier.timer == 42
    end

    test "create_air_purifier/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = AirPurifiers.create_air_purifier(@invalid_attrs)
    end

    test "update_air_purifier/2 with valid data updates the air_purifier" do
      air_purifier = air_purifier_fixture()
      update_attrs = %{filter: 456.7, pm10: 43, pm1_0: 43, pm2_5: 43, timer: 43}

      assert {:ok, %AirPurifier{} = air_purifier} = AirPurifiers.update_air_purifier(air_purifier, update_attrs)
      assert air_purifier.filter == 456.7
      assert air_purifier.pm10 == 43
      assert air_purifier.pm1_0 == 43
      assert air_purifier.pm2_5 == 43
      assert air_purifier.timer == 43
    end

    test "update_air_purifier/2 with invalid data returns error changeset" do
      air_purifier = air_purifier_fixture()
      assert {:error, %Ecto.Changeset{}} = AirPurifiers.update_air_purifier(air_purifier, @invalid_attrs)
      assert air_purifier == AirPurifiers.get_air_purifier!(air_purifier.id)
    end

    test "delete_air_purifier/1 deletes the air_purifier" do
      air_purifier = air_purifier_fixture()
      assert {:ok, %AirPurifier{}} = AirPurifiers.delete_air_purifier(air_purifier)
      assert_raise Ecto.NoResultsError, fn -> AirPurifiers.get_air_purifier!(air_purifier.id) end
    end

    test "change_air_purifier/1 returns a air_purifier changeset" do
      air_purifier = air_purifier_fixture()
      assert %Ecto.Changeset{} = AirPurifiers.change_air_purifier(air_purifier)
    end
  end
end
