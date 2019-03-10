class GamesController < ApplicationController
  def index
    @difficulties = Difficulty.all
  end
end
