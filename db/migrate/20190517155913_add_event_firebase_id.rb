class AddEventFirebaseId < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :firebase_id, :string
  end
end
