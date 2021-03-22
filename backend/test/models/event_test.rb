require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  timeObj = DateTime.new

  test "saving an event without a name" do
    event = Event.new(location: "test" , time: timeObj.getgm())
    assert_not event.save, "saved event without a title"
  end

  test "saving an event without time" do
    event = Event.new( event_name: "hello", location: "test")
    assert_not event.save, "saved event without a user"
  end

  test "saving an event without location" do
    event = Event.new( event_name: "hello", time: timeObj.getgm())
    assert_not event.save, "saved event without a location"
  end

  test "saving an event successfully" do
    event = Event.new( event_name: "hello", location: "test", time: timeObj.getgm())
    assert event.save, "saved a valid event successfully"
  end
end
