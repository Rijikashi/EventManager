require 'test_helper'

class AttendeeControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  test "returning json" do
    get attendees_path(format: :json), headers: { 'Accept' => 'application/json' }
    assert_equal 'application/json; charset=utf-8', @response.content_type
  end

  test "index" do
    get attendees_path(format: :json), headers: { 'Accept' => 'application/json' }
    assert_equal( Attendee.all.to_json, @response.body, "index fails")
  end

  test "create and destroy new attendee" do
    post attendees_path(user_id: 1, event_id: 2), headers: { 'Accept' => 'application/json' }
    assert_equal(Attendee.last.to_json, @response.body)


    helper = JSON.parse(Attendee.last.to_json)
    code = delete attendee_path(id: helper["id"], format: :json), headers: { 'Accept' => 'application/json'}
    assert_equal(200, code)
  end

  test "show returns object" do
    expected = Attendee.first.to_json
    helper = JSON.parse(expected)
    first_id = helper["id"]
    get attendee_path(id: first_id, format: :json), headers: { 'Accept' => 'application/json'}

    assert_equal(expected, @response.body)
  end


end
