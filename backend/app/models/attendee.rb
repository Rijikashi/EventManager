class Attendee < ApplicationRecord
  belongs_to :users, optional: true
  belongs_to :events, optional: true

  validates :user_id, presence: true
  validates :event_id, presence: true

  validates_uniqueness_of :user_id, scope: :event_id
end
