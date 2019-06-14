class HomesController < ApplicationController
  def index
    @maps = Map.all
    @teams = Team.where(year_id: Year.current.id)
    @current_year = Year.current.year
  end
end
