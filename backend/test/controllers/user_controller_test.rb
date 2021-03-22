require 'test_helper'

class UserControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  User.create!( name: "bob", age: 15, credibility: 8)
  User.create!( name: "tom", age: 17, credibility: 9)
  test "index" do
    get users_url, as: :json
    assert_equal( User.all.to_json, @response.body, "index fails")
  end

  test "show returns object" do
    get user_url(1), as: :json
    expected = User.first.to_json
    assert_equal(expected,@response.body)
  end

  test "creating new attendee" do
    post users_url, params:{user:{name:"joe",age:20,credibility:10}}, as: :json
    assert_equal(User.last.to_json, @response.body)
  end

  test "destroy attendee " do
    code = delete user_url(2), as: :json
    assert_equal(200, code)
  end
end
