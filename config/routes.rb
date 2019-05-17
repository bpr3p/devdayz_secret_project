Rails.application.routes.draw do
  root 'homes#index'
  get 'maps/index'
  get 'games/index'
  get 'clue/index'
  get 'admin/index'
  get 'teams/index'
  get 'years/index'

  resources :clues
  resources :difficulties
  resources :teams
  resources :events
  resources :homes
  resources :years
  devise_for :users
  namespace :api do
    namespace :v1 do
      resources :clues, only: [:index]
      resources :admin, only: [:index]
      resources :maps
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
