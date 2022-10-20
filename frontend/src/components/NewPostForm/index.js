import { useState, useRef } from "react";
import csrfFetch from "../../store/csrf";
import { useSelector } from "react-redux";
import './NewPostForm.css'

const NewPostForm = () => {
    const currentUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photoFile, setPhotoFile] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const fileRef = useRef(null);
    

    const handleTitleInput = e => {
        setTitle(e.currentTarget.value);
    }

    const handleDescriptionInput = e => {
        setDescription(e.currentTarget.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('post[photo]', photoFile);
        formData.append('post[poster_id]', currentUser.id);

        if (title) {
            formData.append('post[title]', title);
        }
        if (description) {
            formData.append('post[description]', description);
        }

        const res = await csrfFetch('/api/posts', {
            method: 'POST',
            body: formData
        });

        if (res.ok) {
            const message = await res.json();
            // console.log(message.message);
            setTitle('');
            setDescription('');
            setPhotoFile(null);
            setPhotoUrl(null);
            fileRef.current.value = null;
        }
    }

    const handleFile = (e) => {
        const file = e.currentTarget.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                setPhotoFile(file);
                setPhotoUrl(fileReader.result);
            };
        }
    }

    const preview = photoUrl ? <img src={photoUrl} alt="" /> : null

    return (
        <div id="newPostForm">
            <form onSubmit={ handleSubmit }>
                <label> Add a Title
                    <input type="text" value={title} onChange={ handleTitleInput }/>
                </label>
                <label> Add a Description
                    <input type="text" value={description} onChange={handleDescriptionInput} />
                </label>
                <input type="file" ref={ fileRef } onChange={ handleFile } required/>  
                <h6>Photo Upload Preview</h6>   
                {preview}
                <button>Upload a Photo</button>
            </form>
        </div>

    )

};

export default NewPostForm;