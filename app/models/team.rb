class Team < ApplicationRecord
  belongs_to :year
  has_many :scores

  after_save :firebase_update
  after_destroy :firebase_delete

  def initialize_client
    @client = Firebase::Team.new(self)
  end

  def firebase_update_scores
    initialize_client
    @client.update_score
  end

  private

  def firebase_update
    initialize_client
    @client.create_or_sync_in_cloud
  end

  def firebase_delete
    initialize_client
    @client.delete
  end
end
