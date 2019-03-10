class DifficultiesController < ApplicationController
  def index
    @difficulties = Difficulty.all
  end

  def show
    @difficulty = Difficulty.find(params[:id])
  end

  def new
    @difficulty = Difficulty.new
  end

  def create
    @difficulty = Difficulty.new(difficulty_params)
    @difficulty.save
    redirect_to @difficulty
  end

  def edit
    @difficulty = Difficulty.find(params[:id])
  end

  def update
    @difficulty = Difficulty.find(params[:id])

    if @difficulty.update_attributes(difficulty_params)
      redirect_to difficulty_path(@difficulty)
    else
      @errors = @difficulty.errors.full_messages
      render :edit
    end
  end


  private
    def difficulty_params
      params.require(:difficulty).permit(:name, :rating)
    end
end
