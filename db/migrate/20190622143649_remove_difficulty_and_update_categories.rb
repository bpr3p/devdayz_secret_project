class RemoveDifficultyAndUpdateCategories < ActiveRecord::Migration[5.2]
  def up
    rename_column :clues, :difficulty_id, :category_id
    event = Event.where(name: "Pictionary", year_id: Year.find_by(year: 2019).id)
    categories = Category.joins(:clues).where("clues.event_id = event_id").uniq
    categories.each do |c|
      c.update_attributes(year_id: Year.find_by(year: 2019).id)
    end
  end

  def down
    event = Event.where(name: "Pictionary", year_id: Year.find_by(year: 2019).id)
    categories = Category.joins(:clues).where("clues.event_id = event_id").uniq
    categories.each do |c|
      c.update_attributes(year_id: nil)
    end
    rename_column :clues, :category_id, :difficulty_id
  end
end
