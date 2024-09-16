namespace :db do
  desc "Delete specific rows from event table"
  task delete_old_events: :environment do
    current_time = DateTime.now

    events_to_delete = Event.where('time < ?', current_time)

    puts "Deleting #{events_to_delete.count} events"

    events_to_delete.destroy_all

    puts "Deletion Complete"
  end
end
