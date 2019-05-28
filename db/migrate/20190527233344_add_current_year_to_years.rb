class AddCurrentYearToYears < ActiveRecord::Migration[5.2]
  def change
    add_column :years, :current, :boolean, default: false
  end
end
