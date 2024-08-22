# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Host.destroy_all
Attendee.destroy_all
Event.destroy_all

staticTime = DateTime.civil_from_format :local, 2012
User.create!( name: "bob", age: 15, credibility: 8)
User.create!(name:"Bob", age:15, credibility:10)
User.create!(name:"Fred", age:16, credibility:9)
User.create!(name:"Joe", age:17, credibility:8)
User.create!(name:"Tom", age:18, credibility:7)
User.create!( name: "tom", age: 17, credibility: 9)
Host.create!(user_id:1, event_id: 2)
Host.create!(user_id:1, event_id: 3)
Host.create!(user_id:2, event_id: 4)
Host.create!(user_id:2, event_id: 5)
Host.create!(user_id:2, event_id: 6)
Host.create!( user_id: 1, event_id: 1)
Attendee.create!( user_id: 1, event_id: 1)
Attendee.create!( user_id: 1, event_id: 3)
Attendee.create!(user_id: 4, event_id: 2)
Attendee.create!(user_id: 4, event_id: 3)
Attendee.create!(user_id: 4, event_id: 4)
Attendee.create!(user_id: 4, event_id: 5)
Attendee.create!(user_id: 4, event_id: 6)
Attendee.create!(user_id: 3, event_id: 2)
Attendee.create!(user_id: 3, event_id: 3)
Attendee.create!(user_id: 3, event_id: 4)
Attendee.create!(user_id: 3, event_id: 5)
Attendee.create!(user_id: 2, event_id: 2)
Attendee.create!(user_id: 2, event_id: 3)
Attendee.create!(user_id: 2, event_id: 4)
Event.create!( event_name: "test", location: "test_place", time: staticTime, latitude: 200, longitude: 200)
Event.create!( event_name: "a", location: "a_place", time: staticTime, latitude: 45, longitude: 45)
Event.create!( event_name: "b", location: "b_place", time: staticTime, latitude: 45, longitude: 45)
Event.create!( event_name: "c", location: "c_place", time: staticTime, latitude: 45, longitude: 45)
Event.create!( event_name: "aaaa", location: "a_place", time: staticTime, latitude: 45, longitude: 45)
Event.create!( event_name: "bbbb", location: "b_place", time: staticTime, latitude: 65, longitude: 65)
Event.create!( event_name: "cccc", location: "c_place", time: staticTime, latitude: 0, longitude: 45)
Event.create!( event_name: "dddd", location: "d_place", time: staticTime, latitude: 45, longitude: 0)