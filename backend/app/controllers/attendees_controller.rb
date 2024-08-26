class AttendeesController < ApplicationController
  include AttendeeHelper
  skip_before_action :verify_authenticity_token

  def createNewAttendee
    @attendee = Attendee.new(event_id: params[:event_id], user_id: params[:user_id])
    if @attendee.save
      render :json => @attendee
    else
      render json: {error: "Unable to create attendee"}, status:400
    end
  end

  def index
    @attendees = Attendee.all
    if @attendees
      render :json => @attendees
    else
      render json: {error: "Unable to find attendees"}, status:400
    end
  end
  def show
    @attendee = Attendee.find(params[:id])
    if @attendee
      render :json => @attendee
    else
      render json: {error: "Unable to find attendee"}, status:400
    end
  end
  def create
    @attendee = Attendee.new(event_id: params[:event_id], user_id: params[:user_id])
    if @attendee.save
      render :json => @attendee
    else
      render json: {error: "Unable to create attendee"}, status:400
    end
  end
  def destroy
    @attendee = Attendee.find(params[:id])
    if @attendee
        @attendee.destroy
        render json: {message: "Attendee successfully deleted"}, status: 200
    else
        render json: {error: "Unable to delete attendee"}, status: 400
    end
  end
  def update
    @attendee = Attendee.find(params[:id])
    if @attendee
      @attendee.update(@attendee_params)
      render :json => @attendee
    else
      render json: {error: "Unable to update attendee"}, status:400
    end
  end
end
