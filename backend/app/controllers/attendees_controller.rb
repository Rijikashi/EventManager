class AttendeesController < ApplicationController
  include AttendeeHelper
  skip_before_action :verify_authenticity_token

  def createNewAttendee
    attendee = Attendee.new(event_id: params[:event_id], user_id: params[:user_id])
    if attendee.save
      respond_to do |format|
        format.json {render :json => attendee}
      end
    else
      render json: {error: "Unable to create attendee"}, status:400
    end
  end

  def index
    attendees = Attendee.all

    respond_to do |format|
      format.json { render json: attendees }
      format.html { render html: "Not supported", status: 406 } # Optional: Handle HTML explicitly
    end
  end
  def show
    attendee = Attendee.find(params[:id])
    if attendee
      respond_to do |format|
        format.json {render :json => attendee}
      end
    else
      render json: {error: "Unable to find attendee"}, status:400
    end
  end
  def create
    attendee = Attendee.new(user_id: params[:user_id], event_id: params[:event_id])
    if attendee.save
      respond_to do |format|
        format.json {render :json => attendee}
      end
    else
      render json: {error: "Unable to create attendee"}, status:400
    end
  end
  def destroy
    attendee = Attendee.find(params[:id])
    if attendee
        attendee.destroy
        respond_to do |format|
          format.json {render json: {message: "Attendee successfully deleted"}, status: 200}
        end
    else
        render json: {error: "Unable to delete attendee"}, status: 400
    end
  end
  def update
    attendee = Attendee.find(params[:id])
    if attendee
      attendee.update(attendee_params)
      respond_to do |format|
        format.json {render :json => attendee}
      end

    else
      render json: {error: "Unable to update attendee"}, status:400
    end
  end
end
