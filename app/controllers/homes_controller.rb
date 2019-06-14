class HomesController < ApplicationController
  def index
    @maps = Map.all.order(:id)
    @teams = Team.where(year_id: Year.current.id)
    @current_year = Year.current.year
  end
end
