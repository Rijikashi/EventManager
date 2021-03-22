module HostHelper
  def host_params
    params.require(:host).permit(:user_id, :event_id)
  end
end
