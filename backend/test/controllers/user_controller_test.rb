require 'test_helper'

class UserControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  test "index" do
    get users_url, as: :json
    assert_equal( User.all.to_json, @response.body, "index fails")
  end

  test "show returns object" do
    get user_url(1), as: :json
    expected = User.first.to_json
    assert_equal(expected,@response.body)
  end

  test "creating and destroying user" do
    post users_path(name: "Luigi", age: 20, credibility: 10), headers: { 'Accept' => 'application/json' }
    assert_equal(User.last.to_json, @response.body)

    helper = JSON.parse(User.last.to_json)
    code = delete user_url(helper["id"]), as: :json
    assert_equal(200, code)
  end
end
