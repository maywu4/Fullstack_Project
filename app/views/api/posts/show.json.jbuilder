json.post do
#   json.extract! @post, :id, :title, :description, :poster_id, :created_at, :updated_at
    json.partial! '/api/posts/post', post: @post
end


