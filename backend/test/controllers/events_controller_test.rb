require 'test_helper'

class EventsControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  staticTime = DateTime.civil_from_format :local, 2012

  test "index calls successfully" do
    get events_url
    assert_response :success
  end
  test "index returns objects" do
    get events_url, as: :json
    assert_equal( Event.all.to_json, @response.body, "index fails")
  end
  test "show returns object" do
    get event_url(2), as: :json
    expected = Event.find(2).to_json
    assert_equal(expected,@response.body, "show one object")
  end
  test " findAttendees event 2 " do
    get findAttendees_url(2), as: :json
    expected = User.select('id, name').where(id:[2,3,4]).to_json
    assert_equal(expected,@response.body)
  end
  test " findAttendees event 3 " do
    get findAttendees_url(3), as: :json
    expected = User.select('id, name').where(id:[1,2,3,4]).to_json
    assert_equal(expected,@response.body)
  end
  test " findAttendees event 4 " do
    get findAttendees_url(4), as: :json
    expected = User.select('id, name').where(id:[2,3,4]).to_json
    assert_equal(expected,@response.body)
  end
  test " findAttendees event 5 " do
    get findAttendees_url(5), as: :json
    expected = User.select('id, name').where(id:[3,4]).to_json
    assert_equal(expected,@response.body)
  end
  test " findAttendees event 6 " do
    get findAttendees_url(6), as: :json
    expected = User.select('id, name').where(id:[4]).to_json
    assert_equal(expected,@response.body)
  end
  test " findHosts event 2" do
    get findHosts_url(2), as: :json
    expected = User.select('id, name').where(id:[1]).to_json
    assert_equal(expected,@response.body)
  end
  test " findHosts event 3" do
    get findHosts_url(3), as: :json
    expected = User.select('id, name').where(id:[1]).to_json
    assert_equal(expected,@response.body)
  end
  test " findHosts event 4" do
    get findHosts_url(4), as: :json
    expected = User.select('id, name').where(id:[2]).to_json
    assert_equal(expected,@response.body)
  end

  test "findNearby calls successfully" do
    get findNearby_url(50,50,20,20)
    assert_response :success
  end
  test "search calls successfully" do
    get search_url("test")
    assert_response :success
  end
  test "create/find/delete new event" do
    # CREATE
    post events_url, params: {event: {event_name: "new",location: "new_place!", time: staticTime, latitude: 200, longitude: 200}}, as: :json
    helper = JSON.parse(Event.last.to_json)
    assert_equal(Event.find(helper["id"]).to_json, @response.body, "failed creating")
    # FIND
    get search_path("new"), as: :json
    expected_search = "[" + Event.find(helper["id"]).to_json + "]"
    assert_equal(expected_search, @response.body, "failed searching")
    # DELETE
    code = delete event_url(helper["id"]), as: :json
    assert_equal(200, code, "failed deletion 1")
    get search_path("new"), as: :json
    expected = "[]"
    assert_equal(expected, @response.body, "failed deletion 2")
  end
  test "findNearby(40,50,40,50) with 4 nearby events" do
    get findNearby_path(40,50,40,50), as: :json
    expected = "[" + Event.find(2).to_json + "," + Event.find(3).to_json + "," + Event.find(4).to_json+ "," + Event.find(5).to_json+"]"
    assert_equal(expected, @response.body,"nearbycall fails")
  end

  test "findNearby(50,51,0,1) with 0 nearby events" do
    get findNearby_path(50,51,0,1), as: :json
    expected = "[]"
    assert_equal(expected, @response.body,"nearbycall fails")
  end

  test "findNearby(-1,1,40,50) with 1 nearby events" do
    get findNearby_path(-1,1,40,50), as: :json
    expected = "[" + Event.find(7).to_json + "]"
    assert_equal(expected, @response.body,"nearbycall fails")
  end
  test "searching 'a' " do
    get search_path("a"), as: :json
    expected = "[" + Event.find(2).to_json + "," + Event.find(9).to_json + "]"
    assert_equal(expected,@response.body)
  end

  test "searching 'aa' " do
    get search_path("aa"), as: :json
    expected = "[" + Event.find(9).to_json + "]"
    assert_equal(expected,@response.body)
  end

end
