defmodule SmartHomeApi.ThermostatsTest do
  use SmartHomeApi.DataCase

  alias SmartHomeApi.Thermostats

  describe "thermostats" do
    alias SmartHomeApi.Thermostats.Thermostat

    import SmartHomeApi.ThermostatsFixtures

    @invalid_attrs %{humidity: nil, temperature: nil, timer: nil}

    test "list_thermostats/0 returns all thermostats" do
      thermostat = thermostat_fixture()
      assert Thermostats.list_thermostats() == [thermostat]
    end

    test "get_thermostat!/1 returns the thermostat with given id" do
      thermostat = thermostat_fixture()
      assert Thermostats.get_thermostat!(thermostat.id) == thermostat
    end

    test "create_thermostat/1 with valid data creates a thermostat" do
      valid_attrs = %{humidity: 120.5, temperature: 120.5, timer: 42}

      assert {:ok, %Thermostat{} = thermostat} = Thermostats.create_thermostat(valid_attrs)
      assert thermostat.humidity == 120.5
      assert thermostat.temperature == 120.5
      assert thermostat.timer == 42
    end

    test "create_thermostat/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Thermostats.create_thermostat(@invalid_attrs)
    end

    test "update_thermostat/2 with valid data updates the thermostat" do
      thermostat = thermostat_fixture()
      update_attrs = %{humidity: 456.7, temperature: 456.7, timer: 43}

      assert {:ok, %Thermostat{} = thermostat} = Thermostats.update_thermostat(thermostat, update_attrs)
      assert thermostat.humidity == 456.7
      assert thermostat.temperature == 456.7
      assert thermostat.timer == 43
    end

    test "update_thermostat/2 with invalid data returns error changeset" do
      thermostat = thermostat_fixture()
      assert {:error, %Ecto.Changeset{}} = Thermostats.update_thermostat(thermostat, @invalid_attrs)
      assert thermostat == Thermostats.get_thermostat!(thermostat.id)
    end

    test "delete_thermostat/1 deletes the thermostat" do
      thermostat = thermostat_fixture()
      assert {:ok, %Thermostat{}} = Thermostats.delete_thermostat(thermostat)
      assert_raise Ecto.NoResultsError, fn -> Thermostats.get_thermostat!(thermostat.id) end
    end

    test "change_thermostat/1 returns a thermostat changeset" do
      thermostat = thermostat_fixture()
      assert %Ecto.Changeset{} = Thermostats.change_thermostat(thermostat)
    end
  end
end
