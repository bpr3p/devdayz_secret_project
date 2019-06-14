module Firebase
  class Event
    def initialize(event)
      @event = event
    end

    def create_or_sync_in_cloud
      path = "#{Year.find(@event.year_id).year}/Events/#{@event.id}/name"
      data = @event.name
      Firebase::Api.new.create_or_update(path, data)
    end
  end
end
