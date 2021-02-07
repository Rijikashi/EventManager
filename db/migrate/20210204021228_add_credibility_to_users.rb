class AddCredibilityToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :credibility, :integer
  end
end
