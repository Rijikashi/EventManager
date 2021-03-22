module EventHelper
  def event_params
    params.require(:event).permit(:event_name, :time, :location, :description, :restrictionAge, :latitude, :longitude)
  end
end
