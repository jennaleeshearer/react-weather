require_relative "boot"

require "rails/all"

Bundler.require(*Rails.groups)

module Weathers
  class Application < Rails::Application
    config.load_defaults 7.1

    config.session_store :cookie_store, key: '_weather'

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3000'
        resource '*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head],
          credentials: true
      end
    end

    config.autoload_lib(ignore: %w(assets tasks))
    config.api_only = false
  end
end
