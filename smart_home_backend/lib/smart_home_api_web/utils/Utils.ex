defmodule SmartHomeApiWeb.Utils.Utils do

  def string_keys_to_atoms(map) do
    Enum.reduce(map, %{}, fn {key, value}, acc ->
      new_key = String.to_existing_atom(key)
      Map.put(acc, new_key, value)
    end)
  end

end
