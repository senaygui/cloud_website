class Users::RegistrationsController < Devise::RegistrationsController
  layout 'registrartion_layout'

  # before_action :configure_sign_up_params, only: [:create]

  def after_sign_up_path_for(_resource)
    user_confirmation_path
  end

  def create
    build_resource(sign_up_params)

    if resource.save
      resource.photo.attach(params[:user][:photo]) if params[:user] && params[:user][:photo].present?
      resource.passport.attach(params[:user][:passport]) if params[:user] && params[:user][:passport].present?

      sign_up(resource_name, resource)
      respond_with resource, location: after_sign_up_path_for(resource)
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end
  end

  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: %i[photo passport])
  # end
end
