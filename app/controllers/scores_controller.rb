class ScoresController < ApplicationController
  def index
    @clues = Score.all
  end

  def update_scores
    puts params[:score_ids]
  end
end
