import './LikeComponent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createLike, deleteLike, fetchLikes, getLikes } from '../../store/likes'


const LikeComponent = ({currentUser, postId}) => {
    const dispatch = useDispatch();
    const likes = useSelector(getLikes);
    const [liked, setLiked] = useState(false)
    
    // console.log(liked)
    useEffect(() => {
        dispatch(fetchLikes());
    }, []);
    
    useEffect(() => {
        
        const like = likes.find(ele => ele.postId === parseInt(postId, 10) && ele.userId === currentUser.id)
        setLiked(like ? true : false)

    },[likes])



    const handleLike = (e) => {
        if (!liked) {
            dispatch(createLike({ postId: postId, userId: currentUser.id }))
            setLiked(true)
        }
    }

    const handleUnlike = (e) => {
        const like = likes.find(ele => ele.postId === parseInt(postId, 10) && ele.userId === currentUser.id)
        dispatch(deleteLike(like.id));
        setLiked(false)
    }

    // console.log(like)

    return (
        <div className='postLikeComponent'>
            {liked ? 
                <FontAwesomeIcon icon={faStar} inverse onClick={handleUnlike}/> 
            : 
                <FontAwesomeIcon icon={emptyStar} inverse onClick={handleLike} /> 
            }
        </div>
    )
}

export default LikeComponent;