class HostsController < ApplicationController
  include HostHelper
  skip_before_action :verify_authenticity_token

  def createNewHost
    host = Host.new(event_id: params[:event_id], user_id: params[:user_id])
    if host.save
      render :json => host
    else
      render json: {error: "Unable to create host"}, status:400
    end
  end

  def index
    hosts = Host.all
    if hosts
      render :json => hosts
    else
      render json: {error: "Unable to find hosts"}, status:400
    end
  end
  def show
    host = Host.find(params[:id])
    if host
      render :json => host
    else
      render json: {error: "Unable to find host"}, status:400
    end
  end
  def create
    host = Host.new(user_id: params[:user_id], event_id: params[:event_id])
    if host.save
      render :json => host
    else
      render json: {error: "Host save failed: #{host.errors.full_messages.join(', ')}"}, status:400
    end
  end
  def destroy
    host = Host.find(params[:id])
    if host
        host.destroy
        render json: {message: "host successfully deleted"}, status: 200
    else
        render json: {error: "Unable to delete host"}, status: 400
    end
  end
  def update
    host = Host.find(params[:id])
    if host
      host.update(host_params)
      render :json => host
    else
      render json: {error: "Unable to update host"}, status:400
    end
  end
end
