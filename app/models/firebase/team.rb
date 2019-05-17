module Firebase
  class Team
    def create(team)
      path = "#{Year.find(team.year_id).year}/Teams/#{team.id}"
      data = {name: team.name}
      Firebase::Api.new.put(path, data)
    end

    def update_score()
      
    end
  end
end
