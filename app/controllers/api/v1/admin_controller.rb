class Api::V1::AdminController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  def index
    render json: {admin: true}
  end
end  