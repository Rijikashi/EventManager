class EventsController < ApplicationController
  include EventHelper
  skip_before_action :verify_authenticity_token

  def findNearby
    nearbyEvents = Event.where({latitude: params[:latitude_lower]..params[:latitude_upper], longitude: params[:longitude_lower]..params[:longitude_upper]})
    render :json => nearbyEvents
  end

  def createNewEvent
    event = Event.new(event_name: params[:eventName], time: params[:time], location: params[:locationName], latitude: params[:latitude], longitude: params[:longitude])
    if event.save
      render :json => event
    else
      render json: {error: "Unable to create event"}, status:400
    end
  end

  def getKey
    key = ENV['GOOGLE_MAPS_API_KEY']
    jsonKEY = ActiveSupport::JSON.encode({key: key})
    render :json => jsonKEY
  end

  def search
    searchResults = Event.where('event_name LIKE ?', "%#{params[:query_name]}%")
    render :json => searchResults
  end

  def findAttendees
    searchResults = User.joins(:attendees).select('users.id, users.name,attendees.event_id').where("event_id = ?",params[:event_id])
    render :json => searchResults
  end

  def findHosts
    searchResults = User.joins(:hosts).select('users.id, users.name,hosts.event_id').where("event_id = ?",params[:event_id])
    render :json => searchResults
  end

  def index
    events = Event.all
    if events
      render :json => events
    else
      render json: {error: "Unable to find events"}, status:400
    end
  end

  def show
    event = Event.find(params[:id])
    if event
      render :json => event
    else
      render json: {error: "Unable to find event"}, status:400
    end
  end

  def create
    event = Event.new(event_params)
    if event.save
      render :json => event
    else
      render json: {error: "Unable to create event"}, status:400
    end
  end

  def update
    event = Event.find(params[:id])
    if event
      event.update(event_params)
      render :json => event
    else
      render json: {error: "Unable to update event"}, status:400
    end
  end

  def destroy
    event = Event.find(params[:id])
    if event
        event.destroy
        render json: {message: "Event successfully deleted"}, status: 200
    else
        render json: {error: "Unable to delete event"}, status: 400
    end
  end
end
