## website
class WebsitesController < ApplicationController
  layout 'web_layout'
  # layout 'application', only: [:user_confirmation]
  def index; end
  def dedicated_hosting; end
  def shared_hosting; end
  def vps_hosting; end
  def about; end
  def pricing; end
  def services; end
  def email_security; end
  def ssl_certificates; end
  def enterprise_email; end
  def magento_pro; end
  def gsuite_google; end
  def iptv_services; end
  def gaming_services; end
  def voice_servers; end
  def virtual_numbers; end
  def database_services; end
  def ddos_protections; end
  def invoice; end
  def cloud_management; end
  def os_licenses; end
  def ai_notebook_subscription; end
  def load_balancer; end
  def firewall; end
  def snapshot; end
  def additional_ip; end
  def blocked_storage; end
  def additional_gateway; end
  def vmware; end
  def vrack; end
  def antivirus; end
  def enterprise_log_analytics; end
  def enterprise_file_storage; end
  def database_cloud_backup; end

  def user_confirmation; end
end
