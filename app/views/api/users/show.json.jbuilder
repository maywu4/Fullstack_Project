json.user do
  json.extract! @user, :id, :username, :email, :first_name, :last_name, :age, :created_at, :updated_at, :about
  if @user.profile_pic.attached?
    json.picture @user.profile_pic.url
  else
    json.picture 'https://momentcaptur.s3.amazonaws.com/profilePic.png' # json.defaultprofile 
  end

  if @user.cover_pic.attached?
    json.coverPhoto @user.cover_pic.url
  else
    json.coverPhoto 'https://momentcaptur.s3.amazonaws.com/coverPhoto.png'
  end
end


