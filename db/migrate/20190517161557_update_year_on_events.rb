class UpdateYearOnEvents < ActiveRecord::Migration[5.2]
  def change
    remove_column :events, :year_id
    add_reference :events, :year, index: true
  end
end
