module Api
  module V1
    class UsersController < ApplicationController
      # Ensure user is authenticated for certain actions
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
          # Generate token or session (not implemented here for simplicity)
          render json: { message: 'Login successful', user: user }, status: :ok
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

      def create
        @user = User.new(user_params)
        if @user.save
          render json: @user, status: :created
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

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
        # Placeholder for actual authorization logic (e.g., checking if current_user == @user)
        unless true # Replace with actual condition
          render json: { error: 'Not authorized' }, status: :forbidden
        end
      end
    end
  end
end
