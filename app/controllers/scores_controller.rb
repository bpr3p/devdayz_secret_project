class ScoresController < ApplicationController
  def index
    @clues = Score.all
  end

  def update_scores
    scores = params[:scores]
    event_id = params[:event_id]
    scores.each do |team_id, score|
      team = Team.find(team_id.to_i)
      Score.find_or_create_by(team_id: team.id, event_id: event_id.to_i).update_attributes(value: score.to_i)
      cloud_team = Firebase::Team.new(team)
      cloud_team.update_score
    end
  end
end
