module Api
  module V1
    class UsersController < ApplicationController

      # GET /users
      # Fetches all users
      def index
        @users = User.all
        render json: @users
      end

      # POST /login
      # find user by email and authenticate based on the password. Store user id in the session
      def login
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
          session[:user_id] = user.id
          render json: { message: 'Login successful', user_id: user.id }, status: :ok
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      # POST /users
      # Creates a new user
      def create
        @user = User.new(user_params)
        if @user.save
          render json: @user, status: :created
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # GET /me
      # Fetches the currently logged-in user
      def show_current_user
        if params[:uid]
          user = User.find_by(id: params[:uid])
          if user
            render json: user, status: :ok
          else
            render json: { error: 'User not found' }, status: :not_found
          end
        else
          render json: { error: 'Not logged in' }, status: :unauthorized
        end
      end


      private

      # Fetches the currently logged-in user
      def current_user
        @current_user ||= User.find_by(id: decoded_token[:user_id]) if decoded_token
      end

      # Decode the token
      def decoded_token
        return unless request.headers['Authorization']

        token = request.headers['Authorization'].split(' ').last
        begin
          JWT.decode(token, Rails.application.secret_key_base)[0]
        rescue JWT::DecodeError
          nil
        end
      end

      # User parameters
      def user_params
        params.require(:user).permit(:name, :surname, :email, :location, :password, :password_confirmation)
      end
    end
  end
end
