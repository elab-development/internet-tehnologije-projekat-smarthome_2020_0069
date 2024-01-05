defmodule SmartHomeApiWeb.Auth.ErrorResponse.Unauthorized do
  defexception [message: "Unauthorized", plug_status: 401]
end

defmodule SmartHomeApiWeb.Auth.ErrorResponse.ConflictUsername do
  defexception [message: "Conflict", plug_status: 409]
end

defmodule SmartHomeApiWeb.Auth.ErrorResponse.DatabaseError do
  defexception [message: "Internal Server Error", plug_status: 500]
end

defmodule SmartHomeApiWeb.Auth.ErrorResponse.BadRequest do
  defexception [message: "Bad request", plug_status: 400]
end

defmodule SmartHomeApiWeb.Auth.ErrorResponse.EncodingError do
  defexception [message: "Internal Server Error", plug_status: 500]
end

defmodule SmartHomeApiWeb.Auth.ErrorResponse.Forbidden do
  defexception [message: "Forbidden", plug_status: 403]
end
