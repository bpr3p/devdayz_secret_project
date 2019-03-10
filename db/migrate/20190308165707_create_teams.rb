class CreateTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :teams do |t|
      t.string :name
      t.integer :year
      t.string :description
      t.integer :total

      t.timestamps null: false
    end
  end
end
