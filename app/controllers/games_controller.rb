class GamesController < ApplicationController
  def index
    @clues = Clue.all
  end
end
