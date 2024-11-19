Rails.application.routes.draw do
  # API routes
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :index, :update, :destroy]
    end
  end

  # Authentication routes
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  # Health check route
  get "up" => "rails/health#show", as: :rails_health_check
end
