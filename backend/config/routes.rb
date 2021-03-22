Rails.application.routes.draw do
  resources :users
  resources :events
  resources :hosts
  resources :attendees

  get 'events/findNearby/:latitude/:longitude/:distance', to: 'events#findNearby', defaults: { format: 'jpg' }, latitude: /[^\/]+/, longitude: /[^\/]+/,distance: /[^\/]+/, as: :findNearby
  get 'events/search/:query_name', to: 'events#search', defaults: { format: 'jpg' }, as: :search
  get 'events/findAttendees/:event_id', to: 'events#findAttendees', defaults: { format: 'jpg' }, as: :findAttendees
  get 'events/findHosts/:event_id', to: 'events#findHosts', defaults: { format: 'jpg' }, as: :findHosts
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
