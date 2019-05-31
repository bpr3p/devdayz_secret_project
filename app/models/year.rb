class Year < ApplicationRecord
  has_many :teams
  has_many :events
  validates_uniqueness_of :current, if: :current

  def self.current
    Year.find_by(current: true)
  end
end
