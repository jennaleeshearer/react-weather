module Api
  module V1
    class UsersController < ApplicationController
      # GET /api/v1/users
      def index
        @users = User.all
        render json: @users
      end
    end
  end
end
