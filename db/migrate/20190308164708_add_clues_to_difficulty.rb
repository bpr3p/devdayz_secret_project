class AddCluesToDifficulty < ActiveRecord::Migration[5.2]
  def change
    add_column :clues, :difficulty_id, :integer
  end
end
