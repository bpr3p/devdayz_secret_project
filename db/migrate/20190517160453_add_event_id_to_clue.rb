class AddEventIdToClue < ActiveRecord::Migration[5.2]
  def change
    add_reference :clues, :event, index: true
  end
end
