# Background

Wishing to save a piece of a moment to hold on to and share with others? [MomentCaptur](https://momentcaptur.herokuapp.com/ "MomentCaptur") is the perfect app to share all the amazing life moments you've captured. As a clone of Flickr, users can collaborate and engage with others in the MomentCaptur community who share a passion for photography.

# Technologies Used
* Rails for application backend
* React & Redux for application frontend
* AWS S3 to store user uploads (profile pictures, cover photos, post photos)


# Functionality & MVPs

* ## New User and User Login
    Anyone who wants to join the MomentCaptur community can sign up for a free account and login to start sharing.

![Signup](./signup.png)
![Login](./login.png)
* ## User profile
    Each user has their own profile and can also view other's profiles. Each profile has an about section, a photostream section, and a faves section. The about section can be updated by the user and can be any description the user chooses to describe themselves, posts, or their account. The photostream section shows the photo posts uploaded by the user and the faves section displays the photo posts they've liked.

    Users can also edit their own name and username as well as change their cover photo and profile picture in the settings page.

 ![UserProfile](./userProfile.png)
 ![UserSettings](./userSettings.png)

* ## Photo Posts
    The homepage is the photo posts index which shows all the posts. Each photo post item component has the username of the user who posted it, when it was created, the post photo, the post title, and the post description. 
    
    In addition, the homepage also has a form to create a new photo post. Once a user uploads a picture, there is a preview and the picture will be associated with the current user as the poster.


    When a specific photo from a photo post in the homepage is clicked, it leads to a post show page. In the post show page, it displays the photo, the poster username, the post title, and post description. 
    
    If the current user signed in is the same as the post poster, a edit post form and a delete post button is shown. The edit post form can be used to update the post title and/or post description and the delete button deletes the entire post.  

 ![postIndex](./postIndex.png)
![postShow](./postShow.png)


# Code Highlights

```javascript
// frontend/src/components/SettingsPage/index.js
const handleProfilePic = (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    if (profilePic) {
        formData.append('user[profilePic]', profilePic);
    };

    dispatch(updateUserPics(formData, currentUser.id));
    setProfilePic(null)
};

const handleCoverPhoto = (e) => {

    e.preventDefault();
    
    const formData = new FormData();
    if (coverPhoto) {
        formData.append('user[coverPic]', coverPhoto);
    };
    dispatch(updateUserPics(formData, currentUser.id)); 
    setCoverPhoto(null)
}
```
The above two functions allows users to change their profile picture or cover photo. They're called on an on-submit event within a change profile pic form and change cover photo form. When the user uploads a photo, it sends the file to the backend as formData, dispatching the thunk action updateUserPics and resets the profilePic and coverPhoto states. 

```javascript
//frontend/src/components/Navigation/index.js
const handleUpdate = (e) => {
    e.preventDefault();
    post.title = title;
    post.description = description;
    dispatch(updatePost(post));
};

const postUpdateForm = () => {
    return (
        <div id='postUpdate'>
            <form onSubmit={handleUpdate}>
                <h6><img src={editIcon} alt="" />Edit Post</h6>
                <br />
                <div id="postTitleInput">
                    <label> Title
                        <br />
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                </div>
                <br />
                <div id="postDescriptionInput">
                    <label> Description
                        <br />
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                </div>
                <br />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

...

{ currentUser.id === post.posterId && postUpdateForm() }

...

```
The code above allows the current session's user to update their own posts. The update post form will only show if the ID of the poster and current user match. The post update form allows the user to update the title and description of the post. 


