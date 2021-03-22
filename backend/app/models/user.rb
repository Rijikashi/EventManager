class User < ApplicationRecord
  has_many :hosts
  has_many :events, :through => :hosts

  has_many :attendees
  has_many :events, :through => :attendees
  validates :name, presence:true
  validates :credibility, presence:true
end
