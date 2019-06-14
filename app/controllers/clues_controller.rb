class CluesController < ApplicationController
  before_action :authenticate_user!

  def index
    @clues = Clue.all
  end

  def show
    @clue = Clue.find(params[:id])
  end

  def new
    @clue = Clue.new
    @current_year = Year.current
  end

  def create
    @clue = Clue.new(clue_params)
    @clue.save
    render action: "index"
  end

  def edit
    @clue = Clue.find(params[:id])
  end

  def update
    Clue.find(params[:id]).update_attributes(clue_params)
    render action: "index"
  end

  def destroy
    Clue.find(params[:id]).destroy
    render action: "index"
  end

  private
    def clue_params
      params.require(:clue).permit(:word, :difficulty_id, :event_id)
    end
end
