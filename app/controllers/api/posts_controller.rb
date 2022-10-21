class Api::PostsController < ApplicationController
    wrap_parameters include: Post.attribute_names + ['title'] + ['description'] + ['posterId'] + [:photo]

    def index
        @posts = Post.all
        render :index
    end

    def create 
        @post = Post.new(post_params)

        if @post.save
            render :show #json: {message: 'You did it!'} #json: {post: @post}
        else
            render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
        end

    end

    def show 
        @post = Post.find(params[:id])

        if @post
            render :show #json: {post: @post} 
        else
            render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @post = Post.find(params[:id])

        if @post.update(post_params)
            render :show #json: {post: @post}
        else
            render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
        end

    end

    def destroy
        @post = Post.find(params[:id])
        unless @post
            render json: { message: 'Unauthorized' }, status: :unauthorized
            return
        end
        @post.destroy
        render :show
    end


    private 

    def post_params
        params.require(:post).permit(:title, :description, :photo, :poster_id)
    end

end