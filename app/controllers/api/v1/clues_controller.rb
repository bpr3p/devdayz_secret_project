class Api::V1::CluesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  def index
    easy = Clue.where(difficulty_id: 1).sample(4)
    medium = Clue.where(difficulty_id: 3).sample(4)
    hard = Clue.where(difficulty_id: 5).sample(4)

    render json: { clues: {easy: easy, medium: medium, hard: hard} }
  end
end
