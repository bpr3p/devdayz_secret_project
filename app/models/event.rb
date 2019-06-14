class Event < ApplicationRecord
  has_many :scores, dependent: :destroy
  has_many :clues
  belongs_to :year
  after_save :firebase_update
  after_destroy do |event|
    firebase_delete(event)
  end

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

  def firebase_delete(event)
    initialize_client
    @client.delete
    event.year.teams.map(&:firebase_update_scores)
  end
end
