module Api
  module V1
    class UsersController < ApplicationController
      before_action :set_user, only: [:destroy, :update]
      before_action :authorize_user, only: [:destroy, :update]

      # GET /users
      # Fetches all users
      def index
        @users = User.all
        render json: @users
      end

      # POST /login
      # Authenticates a user
      def login
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
          session[:user_id] = user.id  # Store user ID in the session
          render json: { message: 'Login successful', user_id: user.id }, status: :ok
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      # DELETE /users/:id
      # Deletes a user
      def destroy
        if @user.destroy
          render json: { message: 'User deleted successfully' }, status: :ok
        else
          render json: { error: 'Failed to delete user' }, status: :unprocessable_entity
        end
      end

      # PUT /users/:id
      # Updates a user
      def update
        if @user.update(user_params)
          render json: { message: 'User updated successfully', user: @user }, status: :ok
        else
          render json: { error: 'Failed to update user', details: @user.errors.full_messages }, status: :unprocessable_entity
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
      # Fetch the currently logged-in user
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

      # Retrieve current user based on token
      # Fetches the currently logged-in user (if using session-based auth)
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

      # Find user by ID
      def set_user
        @user = User.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'User not found' }, status: :not_found
      end

      # Strong parameters
      def user_params
        params.require(:user).permit(:name, :surname, :email, :location, :password, :password_confirmation)
      end

      # Authorization placeholder (implement as needed)
      def authorize_user
        unless current_user == @user
          render json: { error: 'Not authorized' }, status: :forbidden
        end
      end
    end
  end
end
