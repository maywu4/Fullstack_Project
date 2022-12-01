class Api::LikesController < ApplicationController
    wrap_parameters include: Like.attribute_names + ['postId'] + ['userId'] 

    def index
        @likes = Like.all
        render :index
    end

    def create
        @like = Like.new(like_params)

        if @like.save
            render :show
        else 
            render json: { errors: @like.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        @like = Like.find(params[:id])

        if @like
            render :show
        else
            render json: { errors: @like.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @like = Like.find(params[:id])
        unless @like
            render json: { message: 'Unauthorized' }, status: :unauthorized
            return
        end
        @like.destroy
        render :show
    end

    private

    def like_params
        params.require(:like).permit(:post_id, :user_id)
    end

end