class Api::V1::CluesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  def index
    event = Event.where(name: "Pictionary", year_id: Year.current.id)
    @categories = Category.where(year_id: Year.current.id).uniq

    render json: @categories, include: :clues
  end
end
