class Api::V1::MapsController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }
    def index
      maps = Map.all
      render json: maps
    end

    def create
      latitude = params[:latitude]
      longitude = params[:longitude]
      pop_up_text = params[:pop_up_text]

      Map.create(latitude: latitude,
        longitude: longitude,
        pop_up_text: pop_up_text)

      maps = Map.all
      render json: maps
    end

    def update
      id = params[:id]
      latitude = params[:latitude]
      longitude = params[:longitude]
      pop_up_text = params[:pop_up_text]

      map = Map.find(id)
      map.update_attributes(latitude: latitude,
        longitude: longitude,
        pop_up_text: pop_up_text)

      maps = Map.all
      render json: maps
    end

    def destroy
      id = params[:id]

      Map.destroy(id)
      maps = Map.all
      render json: maps
    end
  end
  