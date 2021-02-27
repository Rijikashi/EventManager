require 'test_helper'

class AttendeeControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  timeObj = DateTime.new
  Event.create!( event_name: "a", location: "a_place", time: timeObj.getgm(), latitude: 45, longitude: 45)
  User.create!( name: "bob", age: 15, credibility: 8)
  Event.create!( event_name: "b", location: "b_place", time: timeObj.getgm(), latitude: 45, longitude: 45)
  Event.create!( event_name: "c", location: "c_place", time: timeObj.getgm(), latitude: 45, longitude: 45)
  Attendee.create!( user_id: 1, event_id: 1)
  Attendee.create!( user_id: 1, event_id: 3)
  test "index" do
    get attendees_url, as: :json
    assert_equal( Attendee.all.to_json, @response.body, "index fails")
  end

  test "show returns object" do
    get attendee_url(1), as: :json
    expected = Attendee.first.to_json
    assert_equal(expected,@response.body)
  end

  test "creating new attendee" do
    post attendees_url, params:{attendee:{user_id:1,event_id:2}}, as: :json
    assert_equal(Attendee.last.to_json, @response.body)
  end

  test "destroy attendee " do
    code = delete attendee_url(2), as: :json
    assert_equal(200, code)
  end
end
