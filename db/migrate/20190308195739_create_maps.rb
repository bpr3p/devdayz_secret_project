class CreateMaps < ActiveRecord::Migration[5.2]
  def self.up
    create_table :maps do |t|
      t.string :latitude
      t.string :longitude
      t.string :pop_up_text

      t.timestamps null: false
    end
    Map.create(latitude: "42.3952668", longitude:"-71.1458313", pop_up_text:"3PLYMPICS 007")
    Map.create(latitude:"42.3899627", longitude:" -71.1210779", pop_up_text:"THE QUEST FOR TREY")
    Map.create(latitude:"42.35190", longitude:"-71.04834", pop_up_text:"THE NAME'S BOND. TREY BOND.")
  end

  def self.down
    drop_table :maps
  end
end
