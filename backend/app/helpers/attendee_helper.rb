module AttendeeHelper
  def attendee_params
    params.require(:attendee).permit(:user_id, :event_id)
  end
end
