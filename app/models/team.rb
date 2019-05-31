class Team < ApplicationRecord
  belongs_to :year
  has_many :scores

  after_create :save_remotely

  def save_remotely
    cloud_team = Firebase::Team.new(self)
    cloud_team.create_or_sync_in_cloud
  end
end
