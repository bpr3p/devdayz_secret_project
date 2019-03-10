class CreateClues < ActiveRecord::Migration[5.2]
  def change
    create_table :clues do |t|
      t.string :word
      t.integer :difficulty

      t.timestamps null: false
    end
  end
end
