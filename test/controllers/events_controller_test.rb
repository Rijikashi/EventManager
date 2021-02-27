require 'test_helper'

class EventsControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  timeObj = DateTime.new
  User.create!(name:"Bob", age:15, credibility:10)
  User.create!(name:"Fred", age:16, credibility:9)
  User.create!(name:"Joe", age:17, credibility:8)
  User.create!(name:"Tom", age:18, credibility:7)
  Host.create!(user_id:1, event_id: 2)
  Host.create!(user_id:1, event_id: 3)
  Host.create!(user_id:2, event_id: 4)
  Host.create!(user_id:2, event_id: 5)
  Host.create!(user_id:2, event_id: 6)
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
  Event.create!( event_name: "test", location: "test_place", time: timeObj.getgm(), latitude: 200, longitude: 200)
  Event.create!( event_name: "a", location: "a_place", time: timeObj.getgm(), latitude: 45, longitude: 45)
  Event.create!( event_name: "aaaa", location: "a_place", time: timeObj.getgm(), latitude: 45, longitude: 45)
  Event.create!( event_name: "bbbb", location: "b_place", time: timeObj.getgm(), latitude: 65, longitude: 65)
  Event.create!( event_name: "cccc", location: "c_place", time: timeObj.getgm(), latitude: 0, longitude: 45)
  Event.create!( event_name: "dddd", location: "d_place", time: timeObj.getgm(), latitude: 45, longitude: 0)
  #event = Event.create!( event_name: "a", location: "a_place", time: timeObj.getgm(), latitude: 45, longitude: 45)
  test " findAttendees event 2 " do
    get findAttendees_url(2), as: :json
    expected = "[" + Attendee.find(1).to_json + "," + Attendee.find(6).to_json + "," + Attendee.find(10).to_json + "]"
    assert_equal(expected,@response.body)
  end
  test " findAttendees event 3 " do
    get findAttendees_url(3), as: :json
    expected = "[" + Attendee.find(2).to_json + "," + Attendee.find(7).to_json + "," + Attendee.find(11).to_json + "]"
    assert_equal(expected,@response.body)
  end
  test " findAttendees event 4 " do
    get findAttendees_url(4), as: :json
    expected = "[" + Attendee.find(3).to_json + "," + Attendee.find(8).to_json + "," + Attendee.find(12).to_json + "]"
    assert_equal(expected,@response.body)
  end
  test " findAttendees event 5 " do
    get findAttendees_url(5), as: :json
    expected = "[" + Attendee.find(4).to_json + "," + Attendee.find(9).to_json + "]"
    assert_equal(expected,@response.body)
  end
  test " findAttendees event 6 " do
    get findAttendees_url(6), as: :json
    expected = "[" + Attendee.find(5).to_json + "]"
    assert_equal(expected,@response.body)
  end
  test " findHosts event 2" do
    get findHosts_url(2), as: :json
    expected = "[" + Host.find(1).to_json + "]"
    assert_equal(expected,@response.body)
  end
  test " findHosts event 3" do
    get findHosts_url(3), as: :json
    expected = "[" + Host.find(2).to_json + "]"
    assert_equal(expected,@response.body)
  end
  test " findHosts event 4" do
    get findHosts_url(4), as: :json
    expected = "[" + Host.find(3).to_json + "]"
    assert_equal(expected,@response.body)
  end
  test "index calls successfully" do
    get events_url
    assert_response :success
  end
  test "findNearby calls successfully" do
    get findNearby_url(50,50,20)
    assert_response :success
  end
  test "search calls successfully" do
    get search_url("test")
    assert_response :success
  end
  test "create new event" do
    post events_url, params: {event: {event_name: "new",location: "new_place!", time: timeObj.getgm(), latitude: 200, longitude: 200}}, as: :json
    assert_equal(Event.find(7).to_json, @response.body)
  end
  test "delete 'test' event " do
    code = delete event_url(1), as: :json
    message = "Event successfully deleted"
    assert_equal(200, code)
    get search_path("test"), as: :json
    expected = "[]"
    assert_equal(expected,@response.body)
  end
  test "findNearby(50,50,50) with 3 nearby events" do
    get findNearby_path(50,50,50), as: :json
    expected = "[" + Event.find(2).to_json + "," + Event.find(3).to_json + "," + Event.find(4).to_json+ "]"
    assert_equal(expected, @response.body,"nearbycall fails")
  end

  test "findNearby(50,50,0) with 0 nearby events" do
    get findNearby_path(50,50,0), as: :json
    expected = "[]"
    assert_equal(expected, @response.body,"nearbycall fails")
  end
  test "searching 'a' " do
    get search_path("a"), as: :json
    expected = "[" + Event.find(2).to_json + "," + Event.find(3).to_json + "]"
    assert_equal(expected,@response.body)
  end

  test "searching 'aa' " do
    get search_path("aa"), as: :json
    expected = "[" + Event.find(3).to_json + "]"
    assert_equal(expected,@response.body)
  end

  test "index returns objects" do
    get events_url, as: :json
    assert_equal( Event.all.to_json, @response.body, "index fails")
  end

  test "show returns object" do
    get event_url(2), as: :json
    expected = Event.find(2).to_json
    assert_equal(expected,@response.body)
  end
end
