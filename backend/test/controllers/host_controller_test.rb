# require 'test_helper'
#
# class HostControllerTest < ActionDispatch::IntegrationTest
#   # test "the truth" do
#   #   assert true
#   # end
#   test "index" do
#     get hosts_url, as: :json
#     assert_equal( Host.all.to_json, @response.body, "index fails")
#   end
#
#   test "show returns object" do
#     get host_url(1), as: :json
#     expected = Host.first.to_json
#     assert_equal(expected,@response.body)
#   end
#
#   test "creating new host" do
#     post hosts_url, params:{host:{user_id:1,event_id:2}}, as: :json
#     assert_equal(Host.last.to_json, @response.body)
#   end
#
#   test "destroy host " do
#     code = delete host_url(2), as: :json
#     assert_equal(200, code)
#   end
# end
