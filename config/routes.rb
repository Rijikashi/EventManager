Rails.application.routes.draw do
  resources :users
  resources :events
  resources :hosts
  resources :attendees

  get 'events/findNearby/:latitude/:longitude/:distance', to: 'events#findNearby', defaults: { format: 'jpg' }, as: :findNearby
  get 'events/search/:query_name', to: 'events#search', defaults: { format: 'jpg' }, as: :search
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
