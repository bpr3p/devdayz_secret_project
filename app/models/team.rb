class Team < ApplicationRecord
  belongs_to :year
  has_many :scores

  after_save :firebase_update

  def initialize_client
    @client = Firebase::Team.new(self)
  end

  private

  def firebase_update
    initialize_client
    @client.create_or_sync_in_cloud
  end
end
