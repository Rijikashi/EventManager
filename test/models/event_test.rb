require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "saving an event without a title" do
    event = Event.new
    assert_not event.save, "saved event without a title"
  end

  test "saving an event without user" do
    event = Event.new
    assert_not event.save, "saved event without a user"
  end

  test "saving an event without user" do
    event = Event.new  
    assert_not event.save, "saved event without a user"
  end
end
