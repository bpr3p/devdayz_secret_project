class Clue < ApplicationRecord
  belongs_to :category
  belongs_to :event
  validates :word, presence: true
  validates_associated :category
end
