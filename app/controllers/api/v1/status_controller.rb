module Api
  module V1
    class StatusController < ApplicationController
      def index
        render json: { message: 'API is running!' }
      end
    end
  end
end
