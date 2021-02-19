class EventsController < ApplicationController
  def findNearby
    latitude = params[:latitude].to_f
    longitude = params[:longitude].to_f
    distance = params[:distance].to_f
    #nearbyQuery = Event.where("latitude > :latitude - :distance and latitude < :latitude + :distance and longitude < :longitude + :distance and longitude > :longitude - :distance", {longitude: params[:longitude], latitude: params[:latitude], distance: params[:distance]})
    nearbyQuery = Event.where({latitude: (latitude-distance/2)..(latitude+distance/2), longitude: (longitude-distance/2)..(longitude+distance/2)})
    render json: nearbyQuery.to_json
  end

  def search
    containsQuery = Event.where('event_name LIKE ?', params[:query_name])
    render json: containsQuery.to_json
  end

  def index
    events = Event.all
    render json: events.to_json
  end

  def show
    event = Event.find(params[:id])
    render json: event.to_json
  end

  def new

  end

  def create
    event = Event.new(event_params)
    event.save
  end

  def edit
  end

  def update
    event = Event.find(params[:id])
    event.update(event_params)
  end

  def destroy
    event = Event.find(params[:id])
    event.destroy
  end

end
