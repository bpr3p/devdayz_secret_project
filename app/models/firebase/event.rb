module Firebase
  class Event
    def create_or_sync(event)
      path = "#{Year.find(event.year_id).year}/Events/#{event.id}"
      data = {name: event.name}
      Firebase::Api.new.put(path, data)
    end
  end
end
