class MapsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @maps = Map.all
  end

  def create
  end
end
