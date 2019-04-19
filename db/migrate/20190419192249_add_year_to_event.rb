class AddYearToEvent < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :year_id, :integer
  end
end
