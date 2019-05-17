class GamesController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @clues = Clue.all
  end
end
