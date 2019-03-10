class Difficulty < ApplicationRecord
  has_many :clues
  validates :name, presence: true
  validates :rating, presence: true
end
