class Event < ApplicationRecord
  has_many :scores
  has_many :clues
  belongs_to :year
  after_save :firebase_update

  def self.pictionary
    Event.where(name: "Pictionary")
  end

  def initialize_client
    @client = Firebase::Event.new(self)
  end

  private

  def firebase_update
    initialize_client
    @client.create_or_sync_in_cloud
  end
end
