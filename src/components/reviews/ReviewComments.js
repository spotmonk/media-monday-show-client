import React, { useContext, useEffect } from 'react'
import { ReviewContext } from './ReviewProvider'

export const ReviewComments = (props) => {
    const {review } = props
    const {reviewComments, getReviewComments} = useContext(ReviewContext)

    useEffect(() => {
        getReviewComments(review.id)
    },[review])

    return(<>
        {reviewComments.count > 0 && reviewComments.results.map(rc =>  
      <div className="comment mb-2 item_direction d-flex" >
        <div className="user align-content-center m-2 col-4">
          <img className="profilepic rounded-circle" src={review && review.user_id.profile_image_url} />
          <h6>{review.user_id && review.user_id.user_id.username}</h6>
        </div>
        <div className="comment-text col-7 m-2">
          <p>{rc.text}</p>
        </div>
      </div>
    )}
    
    </>
    )
}