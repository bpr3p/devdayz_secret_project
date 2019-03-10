class Api::V1::CluesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  def index
    clues = Clue.all
    render json: clues
  end
end
