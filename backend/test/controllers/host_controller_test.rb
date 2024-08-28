require 'test_helper'

class HostControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  test "index" do
    get hosts_url, as: :json
    assert_equal( Host.all.to_json, @response.body, "index fails")
  end

  test "show returns object" do
    get host_url(1), as: :json
    expected = Host.first.to_json
    assert_equal(expected,@response.body)
  end

  test "creating and destroying new host" do
    post hosts_path(user_id: 1, event_id: 4), headers: { 'Accept' => 'application/json' }
    assert_equal(Host.last.to_json, @response.body)

    helper = JSON.parse(Host.last.to_json)
    code = delete host_url(helper["id"]), as: :json
    assert_equal(200, code)
  end

  test "creating a new event that already exists" do
    post hosts_path(user_id: 1, event_id: 2), headers: {'Accept' => 'application/json'}
    assert_equal(400, @response.status)
  end

end
