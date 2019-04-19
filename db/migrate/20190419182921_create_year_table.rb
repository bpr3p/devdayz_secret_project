class CreateYearTable < ActiveRecord::Migration[5.2]
  def change
    create_table :years do |t|
      t.integer :year
      t.timestamps null: false
    end

    remove_column :teams, :year
    add_column :teams, :year_id, :integer
  end
end
