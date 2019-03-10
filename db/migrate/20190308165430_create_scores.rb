class CreateScores < ActiveRecord::Migration[5.2]
  def change
    create_table :scores do |t|
      t.integer :team_id
      t.integer :event_id
      t.integer :value

      t.timestamps null: false
    end
  end
end
