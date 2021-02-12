Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :user
      resources :event
      resources :host
      resources :attendee

      get 'events/findNearby/:latitude/:longitude/:distance', to: 'events#findNearby'
      get 'events/search/:event_name', to: 'events#search'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
