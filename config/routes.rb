Rails.application.routes.draw do
  root 'games#index'
  # get 'maps#index'
  get 'maps/index'
  get 'games/index'
  get 'clue/index'

  resources :clues
  resources :difficulties
  resources :teams
  devise_for :users
  namespace :api do
    namespace :v1 do
      resources :clues, only: [:index]
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
