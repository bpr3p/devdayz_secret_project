class Score < ApplicationRecord
  belongs_to :team
  belongs_to :event

  after_save :refresh_team_total

  scope :for_team, -> (team){where(team_id: team.id)}

  def refresh_team_total
    team.update_attributes(total: total_for_team)
  end

  private

  def total_for_team
    self.class.for_team(team).map(&:value).reduce(:+)
  end
end
