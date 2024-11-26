class SessionsController < ApplicationController
    # Logging user via login page
    def create
      user = User.find_by(email: params[:email])
      if user&.authenticate(params[:password])
        session[:user_id] = user.id
        render json: { message: 'Logged in successfully', user_id: user.id }, status: :ok
      else
        render json: { error: 'Invalid credentials' }, status: :unauthorized
      end
    end

    # handles the logout
    def destroy
      session[:user_id] = nil  # Clear the session
      render json: { message: 'Logged out successfully' }, status: :ok
    end
  end
