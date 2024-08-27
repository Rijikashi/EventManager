require 'test_helper'

class AttendeeControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  test "returning json" do
    get attendees_path(format: :json), headers: { 'Accept' => 'application/json' }
    puts @response.body
    puts @response.content_type
    assert_equal 'application/json', @response.content_type
  end
  #
  # test "index" do
  #   get attendees_path(format: :json), headers: { 'Accept' => 'application/json' }
  #   assert_equal( Attendee.all.to_json, @response.body, "index fails")
  # end
  #
  # test "creating new attendee" do
  #   post attendees_path(), params:{attendee:{user_id:1,event_id:2}},headers: { 'Accept' => 'application/json' }
  #   assert_equal(Attendee.last.to_json, @response.body)
  # end
  #
  # test "show returns object" do
  #   get attendees_path(id: 1, format: :json), headers: { 'Accept' => 'application/json'}
  #   expected = Attendee.first.to_json
  #   assert_equal(expected, @response.body)
  # end
  #
  # test "destroy attendee" do
  #   code = delete attendees_path(id: 15, format: :json), headers: { 'Accept' => 'application/json'}
  #   assert_equal(200, code)
  # end

end
