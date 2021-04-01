Rails.application.routes.draw do
  resources :users
  resources :events
  resources :hosts
  resources :attendees

  get 'events/findNearby/:latitude_lower/:latitude_upper/:longitude_lower/:longitude_upper', to: 'events#findNearby', defaults: { format: 'json' }, latitude_upper: /[^\/]+/,latitude_lower: /[^\/]+/,longitude_upper: /[^\/]+/, longitude_lower: /[^\/]+/,as: :findNearby
  get 'events/search/:query_name', to: 'events#search', defaults: { format: 'json' }, as: :search
  get 'events/findAttendees/:event_id', to: 'events#findAttendees', defaults: { format: 'json' }, as: :findAttendees
  get 'events/findHosts/:event_id', to: 'events#findHosts', defaults: { format: 'json' }, as: :findHosts
  get 'getApiKey', to: 'events#getKey', defaults: {format: 'json'}, as: :getKey
  get 'login/:username/:password', to: 'users#authentication', defaults: {format: 'json'}, as: :authentication
  post 'users/createNewUser/:username/:password/:age', to: 'users#createNewUser', defaults: {format: 'json'}, as: :createNewUser
  post 'events/:eventName/:time/:locationName/:latitude/:longitude', to: 'events#createNewEvent', defaults: {format: 'json'}, latitude: /[^\/]+/, longitude: /[^\/]+/, as: :createNewEvent
  post 'attendees/:user_id/:event_id', to: 'attendees#createNewAttendee', defaults: {format: 'json'}, as: :createNewAttendee
  post 'hosts/:user_id/:event_id', to: 'hosts#createNewHost', defaults: {format: 'json'}, as: :createNewHost
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
