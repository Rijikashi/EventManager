Rails.application.routes.draw do
  resources :users
  resources :events
  resources :hosts
  resources :attendees

  get 'events/findNearby/:latitude/:longitude/:distance', to: 'events#findNearby', defaults: { format: 'json' }, latitude: /[^\/]+/, longitude: /[^\/]+/,distance: /[^\/]+/, as: :findNearby
  get 'events/search/:query_name', to: 'events#search', defaults: { format: 'json' }, as: :search
  get 'events/findAttendees/:event_id', to: 'events#findAttendees', defaults: { format: 'json' }, as: :findAttendees
  get 'events/findHosts/:event_id', to: 'events#findHosts', defaults: { format: 'json' }, as: :findHosts
  get 'getApiKey', to: 'events#getKey', defaults: {format: 'json'}, as: :getKey
  get 'login/:username/:password', to: 'users#authentication', defaults: {format: 'json'}, as: :authentication

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
