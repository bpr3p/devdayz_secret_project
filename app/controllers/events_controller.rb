class EventsController < ApplicationController
  before_action only: [:show, :edit, :update, :destroy]

  def index
    @events = Event.all
  end

  def show
    @event = Event.find(params[:id])
  end

  def new
    @year_id = params[:year_id]
    @event = Event.new
  end

  def edit
  end

  def create
    name = params[:event][:name]
    year_id = params[:event][:year_id]
    description = params[:event][:description]
    @event = Event.create(name: name, year_id: year_id, description: description)
    respond_to do |format|
      if @event.save
        format.html { redirect_to @event, notice: 'Event was successfully created.' }
        format.json { render :show, status: :created, location: @event }
      else
        format.html { render :new }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @recipe.update(recipe_params)
        format.html { redirect_to @recipe, notice: 'Recipe was successfully updated.' }
        format.json { render :show, status: :ok, location: @recipe }
      else
        format.html { render :edit }
        format.json { render json: @recipe.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @event.destroy
      respond_to do |format|
      format.html { redirect_to teams_url, notice: 'Event was successfully destroyed.' }
      format.json { head :no_content }
    end
  end
end
