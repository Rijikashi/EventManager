class EventsController < ApplicationController
  include EventHelper
  def findNearby
    latitude = params[:latitude].to_f
    longitude = params[:longitude].to_f
    distance = params[:distance].to_f
    nearbyEvents = Event.where({latitude: (latitude-distance/2)..(latitude+distance/2), longitude: (longitude-distance/2)..(longitude+distance/2)})
    render :json => nearbyEvents
  end

  def getKey
    key = ENV['GOOGLE_MAPS_API_KEY']
    render :json => key
  end
  def search
    searchResults = Event.where('event_name LIKE ?', "%#{params[:query_name]}%")
    render :json => searchResults
  end

  def findAttendees
    searchResults = Attendee.where("event_id = ?", params[:event_id])
    render :json => searchResults
  end

  def findHosts
    searchResults = Host.where("event_id = ?", params[:event_id])
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
