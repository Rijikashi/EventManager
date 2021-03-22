class UsersController < ApplicationController
  include UserHelper

  def index
    users = User.all
    if users
      render :json => users
    else
      render json: {error: "Unable to find users"}, status:400
    end
  end

  def show
    user = User.find(params[:id])
    if user
      render :json => user
    else
      render json: {error: "Unable to find user"}, status:400
    end
  end

  def create
    user = User.new(user_params)
    if user.save
      render :json => user
    else
      render json: {error: "Unable to create user"}, status:400
    end
  end

  def update
    user = User.find(params[:id])
    if user
      user.update(user_params)
      render :json => user
    else
      render json: {error: "Unable to update user"}, status:400
    end
  end

  def destroy
    user = User.find(params[:id])
    if user
        user.destroy
        render json: {message: "user successfully deleted"}, status: 200
    else
        render json: {error: "Unable to delete user"}, status: 400
    end
  end
end
