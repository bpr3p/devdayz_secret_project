class HomesController < ApplicationController
  def index
    @maps = Map.all
  end
end
