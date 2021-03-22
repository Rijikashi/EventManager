# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

timeObj = DateTime.new
event = Event.create!( event_name: "a", location: "a_place", time: timeObj.getgm(), latitude: 45, longitude: 45)
event = Event.create!( event_name: "aaaa", location: "a_place", time: timeObj.getgm(), latitude: 45, longitude: 45)
event = Event.create!( event_name: "bbbb", location: "b_place", time: timeObj.getgm(), latitude: 65, longitude: 65)
event = Event.create!( event_name: "cccc", location: "c_place", time: timeObj.getgm(), latitude: 0, longitude: 45)
event = Event.create!( event_name: "dddd", location: "d_place", time: timeObj.getgm(), latitude: 45, longitude: 0)
user = User.create!(name: "BobTest", credibility: 10)
