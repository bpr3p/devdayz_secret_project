class Category < ApplicationRecord
  has_many :clues
  belongs_to :year
  validates :name, presence: true
end
