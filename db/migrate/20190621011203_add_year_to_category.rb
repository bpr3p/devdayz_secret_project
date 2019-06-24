class AddYearToCategory < ActiveRecord::Migration[5.2]
  def change
    add_reference :categories, :year, index: true
  end
end
