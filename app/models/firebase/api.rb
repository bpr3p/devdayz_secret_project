module Firebase
  class Api
    attr_accessor :client

    FIREBASE_URI = 'https://plympics-scoreboard.firebaseio.com'
    FIREBASE_SECRET = 'ICv7Xi6PpcMBLaLGVLGyOtaWvH3ytF288pDBDv7P'

    def create_or_update(path, data)
      command = "curl -X PUT -d '#{data.to_json}' '#{FIREBASE_URI}/#{path}.json'"
      `#{command}`
    end

    def delete(path)
      command = "curl -X DELETE '#{FIREBASE_URI}/#{path}.json'"
      `#{command}`
    end
  end
end
