require 'test_helper'

class UserTest < ActiveSupport::TestCase

  test "saving a user without credibility" do
    user = User.new(name: "test")
    assert_not user.save, "saved user without credibility"
  end

  test "saving a user without a name" do
    user = User.new(credibility: 5)
    assert_not user.save, "saved user without name"
  end

  test "saving a user with name and credibility" do
    user = User.new(name: "bob", credibility: 5)
    assert user.save, "saved user with name"
  end
end
