# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :phoenix_kanban,
  ecto_repos: [PhoenixKanban.Repo]

# Configures the endpoint
config :phoenix_kanban, PhoenixKanban.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "pWRNXZR4wSTfN4e2tt83CjD4t4y11bd9YXa7oP7iCxtJIExbALdol7ugZLxOCymF",
  render_errors: [view: PhoenixKanban.ErrorView, accepts: ~w(html json)],
  pubsub: [name: PhoenixKanban.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
