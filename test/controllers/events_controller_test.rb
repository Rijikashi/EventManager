require 'test_helper'

class EventsControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  test "index" do
    get events_url
    assert_response :success
  end
  test "findNearby" do
    get findNearby_url(50,50,50)
    assert_response :success
  end

  test "search" do
    get search_url("test")
    assert_response :success
  end
end
