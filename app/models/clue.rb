class Clue < ApplicationRecord
  belongs_to :difficulty
  belongs_to :event
  validates :word, presence: true
  validates_associated :difficulty
end
