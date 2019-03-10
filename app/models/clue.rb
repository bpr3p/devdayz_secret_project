class Clue < ApplicationRecord
  belongs_to :difficulty
  validates :word, presence: true
  validates_associated :difficulty
end
