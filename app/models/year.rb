class Year < ApplicationRecord
  has_many :teams
  has_many :events
end
