import './LikeComponent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'

const LikeComponent = () => {
    const [liked, setLiked] = useState(false)

    return (
        <div className='postLikeComponent'>
            {liked ? <FontAwesomeIcon icon={faStar} inverse /> : <FontAwesomeIcon icon={emptyStar} inverse /> }
        </div>
    )
}

export default LikeComponent;