class Year < ApplicationRecord
  has_many :teams
  has_many :events
  has_many :categories
  validates_uniqueness_of :current, if: :current

  def self.current
    Year.find_by(current: true)
  end
end
