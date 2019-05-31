class Score < ApplicationRecord
  belongs_to :team
  belongs_to :event

  scope :for_team, -> (team){where(team_id: team.id)}

  def refresh_team_total
    team.update_attributes(total: total_for_team)
  end
end
