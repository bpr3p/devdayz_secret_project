Rails.application.routes.draw do
  root 'maps#index'
  get 'maps/index'
  get 'games/index'
  get 'clue/index'

  resources :clues
  resources :difficulties
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
