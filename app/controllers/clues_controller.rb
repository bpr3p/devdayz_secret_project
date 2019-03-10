class CluesController < ApplicationController
  def index
    @clues = Clue.all
  end

  def show
    @clue = Clue.find(params[:id])
  end

  def new
    @clue = Clue.new
  end

  def create
    @clue = Clue.new(clue_params)
    @clue.save
    redirect_to @clue
  end

  private
    def clue_params
      params.require(:clue).permit(:word, :difficulty_id)
    end
end
