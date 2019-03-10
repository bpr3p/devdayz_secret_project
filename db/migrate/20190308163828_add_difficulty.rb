class AddDifficulty < ActiveRecord::Migration[5.2]
  def change
    create_table :difficulties do |t|
      t.string :name
      t.integer :rating

      t.timestamps null: false
    end
  end
end
