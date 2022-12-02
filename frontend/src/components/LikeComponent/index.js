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
    const like = likes.find(ele => ele.postId === parseInt(postId, 10) && ele.userId === currentUser.id)
    // const [liked, setLiked] = useState(like ? true : false)

    useEffect(() => {
        dispatch(fetchLikes());
    }, []);


    const handleLike = (e) => {
        if (!like) {
            dispatch(createLike({ postId: postId, userId: currentUser.id }))
            // setLiked(true)
        }
    }

    const handleUnlike = (e) => {
        dispatch(deleteLike(like.id));
        // setLiked(false)
    }

    // console.log(like)

    return (
        <div className='postLikeComponent'>
            {like ? 
                <FontAwesomeIcon icon={faStar} inverse onClick={handleUnlike}/> 
            : 
                <FontAwesomeIcon icon={emptyStar} inverse onClick={handleLike} /> 
            }
        </div>
    )
}

export default LikeComponent;