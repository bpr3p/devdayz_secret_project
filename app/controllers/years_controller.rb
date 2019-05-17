class YearsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @years = Year.all
  end

  def new
    @year = Year.new
  end

  def show
    @year = Year.find(params[:id])
  end

  def create
    @year = Year.new(year_params)

    respond_to do |format|
      if @year.save
        format.html { redirect_to year_url(@year.id), notice: "Year #{@year.year} was successfully created." }
        format.json { render :show, status: :created}
      else
        format.html { render :new }
        format.json { render json: @year.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def year_params
    params.require(:year).permit(:year)
  end

end

