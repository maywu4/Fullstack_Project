json.posts do 
    @posts.each do |post|
        json.set! post.id do
            json.partial! '/api/posts/post', post: post
            json.picture post.photo.url
        end
    end
end