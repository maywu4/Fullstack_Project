class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password'] + ['firstName'] + ['lastName'] + ['about'] + [:profilePic] + [:coverPic]

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show #json: {user: @user}
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show 
    @user=User.find(params[:id])

    if @user 
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @user=User.find(params[:id])

    if @user.update(user_params)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :first_name, :last_name, :age, :password, :about, :cover_pic, :profile_pic)
  end

end
