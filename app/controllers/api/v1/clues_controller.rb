class Api::V1::CluesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  def index
    easy = Clue.where(difficulty_id: 1)
    medium = Clue.where(difficulty_id: 2)
    hard = Clue.where(difficulty_id: 3)
    nail_biter = Clue.where(difficulty_id: 4)

    render json: { clues: { easy: easy, medium: medium, hard: hard, nailBiter: nail_biter } }
  end
end
