# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

staticTime = DateTime.civil_from_format :local, 2012
User.destroy_all
users = User.create([
  {name: "Mario", age: 15, credibility: 8},
  {name: "Bob", age: 16, credibility: 10},
  {name: "Fred", age: 17, credibility: 9},
  {name: "Joe", age: 18, credibility: 8},
  {name: "ToBeDeleted", age: 20, credibility: 9}
])

Event.destroy_all
events = Event.create([
  {event_name: "test", location: "test_place", time: staticTime, latitude: 200, longitude: 200},
  {event_name: "a", location: "a_place", time: staticTime, latitude: 45, longitude: 45},
  {event_name: "b", location: "b_place", time: staticTime, latitude: 45, longitude: 45},
  {event_name: "c", location: "c_place", time: staticTime, latitude: 45, longitude: 45},
  {event_name: "d", location: "d_place", time: staticTime, latitude: 45, longitude: 45},
  {event_name: "e", location: "e_place", time: staticTime, latitude: 65, longitude: 65},
  {event_name: "f", location: "f_place", time: staticTime, latitude: 0, longitude: 45},
  {event_name: "g", location: "g_place", time: staticTime, latitude: 45, longitude: 0},
  {event_name: "ToBeDeleted", location: "limbo", time: staticTime, latitude: -100, longitude: -100}
  ])

Host.destroy_all
hosts = Host.create([
  {user_id: 1, event_id: 1},
  {user_id: 1, event_id: 2},
  {user_id: 1, event_id: 3},
  {user_id: 2, event_id: 4},
  {user_id: 2, event_id: 5},
  {user_id: 2, event_id: 6},
  {user_id: 3, event_id: 8}
  ])


Attendee.destroy_all
attendees = Attendee.create([
  {user_id: 1, event_id: 1},
  {user_id: 1, event_id: 3},
  {user_id: 2, event_id: 2},
  {user_id: 2, event_id: 3},
  {user_id: 2, event_id: 4},
  {user_id: 3, event_id: 2},
  {user_id: 3, event_id: 3},
  {user_id: 3, event_id: 4},
  {user_id: 3, event_id: 5},
  {user_id: 4, event_id: 2},
  {user_id: 4, event_id: 3},
  {user_id: 4, event_id: 4},
  {user_id: 4, event_id: 5},
  {user_id: 4, event_id: 6},
  {user_id: 4, event_id: 7}


  ])
