json.comment do 
    json.partial! '/api/comments/comment', comment: @comment
end

json.user do 
    json.partial! '/api/users/user', user: @comment.author
end

json.post do
    json.partial! '/api/posts/post', post: @comment.post
end