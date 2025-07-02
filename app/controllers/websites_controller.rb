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

  def user_confirmation; end
end
