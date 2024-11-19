class AuthController < ApplicationController

  def login
    user = User.find_by(email: params[:email])
    if(user && user.authenticate(params[:password]))
      render json {user: user}
    else
      render json: {errors: "invalid email"}
  end
end
