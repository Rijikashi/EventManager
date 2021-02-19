require 'test_helper'

class EventsControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
#  timeObj = DateTime.new
  #event = Event.create!( event_name: "a", location: "a_place", time: timeObj.getgm(), latitude: 45, longitude: 45)
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

end
