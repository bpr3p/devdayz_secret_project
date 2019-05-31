class TeamsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_recipe, only: [:show, :edit, :update, :destroy]

  def index
    @teams = Team.all
  end

  def show
    @team = Team.find(params[:id])
  end

  def new
    @year_id = params[:year_id]
    @team = Team.new
  end

  def edit
  end

  def create
    @team = Team.new(team_params)
    respond_to do |format|
      if @team.save
        format.html { render :index, notice: 'Team was successfully created.' }
      else
        format.html { render :new }
        format.json { render json: @team.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @team.update(team_params)
        format.html { redirect_to @team, notice: 'Team was successfully updated.' }
        format.json { render :show, status: :ok, location: @team }
      else
        format.html { render :edit }
        format.json { render json: @team.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    id = params[:id]
    team = Team.find(id)
    team.destroy
      respond_to do |format|
      format.html { redirect_to teams_url, notice: 'Team was successfully deleted.' }
      format.json { head :no_content }
    end
  end

 private

 # Use callbacks to share common setup or constraints between actions.
  def set_recipe
    @team = Team.find(params[:id]) if params[:id].present?
  end

  def team_params
    params.require(:team).permit(:name, :description, :year_id)
  end
end
