class AddRestrictionAgeToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :restrictionAge, :integer
  end
end
