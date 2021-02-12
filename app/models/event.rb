class Event < ApplicationRecord
  has_many :hosts
  has_many :users, :through => :hosts

  has_many :attendaees, dependent: :destroy
  has_many :users, :through => :attendees

  validates :event_name, presence:true
  validates :time, presence:true
  validates :location, presence:true
  
end
