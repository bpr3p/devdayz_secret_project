class UpdateCluesTable < ActiveRecord::Migration[5.2]
  def change
    rename_column :clues, :difficulty, :category
  end
end
