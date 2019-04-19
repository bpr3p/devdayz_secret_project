class Team < ApplicationRecord
  belongs_to :year
  has_many :scores
end
