Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :user
      resources :event
      get 'events/find/:id', to: 'events#find'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
