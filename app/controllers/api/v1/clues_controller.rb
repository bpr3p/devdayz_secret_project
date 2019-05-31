class Api::V1::CluesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  def index
    event = Event.where(name: "Pictionary", year_id: Year.current.id)
    easy = Clue.where(difficulty_id: 1, event: event)
    medium = Clue.where(difficulty_id: 2, event: event)
    hard = Clue.where(difficulty_id: 3, event: event)
    nail_biter = Clue.where(difficulty_id: 4, event: event)

    render json: { clues: { easy: easy, medium: medium, hard: hard, nailBiter: nail_biter } }
  end
end
