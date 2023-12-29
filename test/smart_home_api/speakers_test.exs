defmodule SmartHomeApi.SpeakersTest do
  use SmartHomeApi.DataCase

  alias SmartHomeApi.Speakers

  describe "speakers" do
    alias SmartHomeApi.Speakers.Speaker

    import SmartHomeApi.SpeakersFixtures

    @invalid_attrs %{bass: nil, battery: nil, volume: nil}

    test "list_speakers/0 returns all speakers" do
      speaker = speaker_fixture()
      assert Speakers.list_speakers() == [speaker]
    end

    test "get_speaker!/1 returns the speaker with given id" do
      speaker = speaker_fixture()
      assert Speakers.get_speaker!(speaker.id) == speaker
    end

    test "create_speaker/1 with valid data creates a speaker" do
      valid_attrs = %{bass: 42, battery: 120.5, volume: 42}

      assert {:ok, %Speaker{} = speaker} = Speakers.create_speaker(valid_attrs)
      assert speaker.bass == 42
      assert speaker.battery == 120.5
      assert speaker.volume == 42
    end

    test "create_speaker/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Speakers.create_speaker(@invalid_attrs)
    end

    test "update_speaker/2 with valid data updates the speaker" do
      speaker = speaker_fixture()
      update_attrs = %{bass: 43, battery: 456.7, volume: 43}

      assert {:ok, %Speaker{} = speaker} = Speakers.update_speaker(speaker, update_attrs)
      assert speaker.bass == 43
      assert speaker.battery == 456.7
      assert speaker.volume == 43
    end

    test "update_speaker/2 with invalid data returns error changeset" do
      speaker = speaker_fixture()
      assert {:error, %Ecto.Changeset{}} = Speakers.update_speaker(speaker, @invalid_attrs)
      assert speaker == Speakers.get_speaker!(speaker.id)
    end

    test "delete_speaker/1 deletes the speaker" do
      speaker = speaker_fixture()
      assert {:ok, %Speaker{}} = Speakers.delete_speaker(speaker)
      assert_raise Ecto.NoResultsError, fn -> Speakers.get_speaker!(speaker.id) end
    end

    test "change_speaker/1 returns a speaker changeset" do
      speaker = speaker_fixture()
      assert %Ecto.Changeset{} = Speakers.change_speaker(speaker)
    end
  end
end
