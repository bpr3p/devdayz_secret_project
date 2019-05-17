class Event < ApplicationRecord
  has_many :scores
  has_many :clues
  belongs_to :year
end
