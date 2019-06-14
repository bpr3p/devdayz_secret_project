module Firebase
  class Team
    def initialize(team)
      @team = team
    end

    def team(reload=false)
      @team.reload if reload
      return @team
    end

    def create_or_sync_in_cloud
      path = "#{Year.find(team.year_id).year}/Teams/#{team.id}/name"
      data = team.name
      Firebase::Api.new.create_or_update(path, data)
    end

    def update_score
      path = "#{Year.find(team.year_id).year}/Teams/#{team.id}/scores"
      data = team(reload:true).scores.map{|score| [score.event_id, score.value]}.to_h
      Firebase::Api.new.create_or_update(path, data)
    end

    def delete
      path = "#{Year.find(team.year_id).year}/Teams/#{team.id}"
      Firebase::Api.new.delete(path)
    end
  end
end
