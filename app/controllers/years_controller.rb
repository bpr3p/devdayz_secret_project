class YearsController < ApplicationController
  before_action :authenticate_user!

  def index
    @years = Year.all
    @current_year = Year.current
  end

  def new
    @year = Year.new
  end

  def show
    @year = Year.find(params[:id])
  end

  def set_year
    old_year = Year.current
    old_year&.update_attributes(current: false)
    new_year = Year.find(params[:year][:year_id].to_i)
    new_year.update_attributes(current: true)
    @current_year = Year.current
    render :index
  end

  def create
    @year = Year.new(year_params)

    respond_to do |format|
      if @year.save
        format.html {
          redirect_to year_url(@year.id),
          notice: "Year #{@year.year} was successfully created."
        }
        format.json { render :show, status: :created }
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
