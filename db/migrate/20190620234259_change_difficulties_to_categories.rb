class ChangeDifficultiesToCategories < ActiveRecord::Migration[5.2]
  def self.up
    rename_table :difficulties, :categories
    remove_column :categories, :rating
  end

  def self.down
    rename_table :categories, :difficulties
    add_column :difficulties, :rating, :integer
  end
end
