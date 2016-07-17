defmodule PhoenixKanban.PageController do
  use PhoenixKanban.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
