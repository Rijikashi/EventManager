class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :event_name
      t.date :time

      t.timestamps
    end

    create_table :users_events do |t|
      t.belongs_to :user
      t.belongs_to :event
    end

  end
end
