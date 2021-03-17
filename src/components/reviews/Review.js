import React, { useContext, useEffect, useState } from 'react'
import { ReviewComments } from '../reviews/ReviewComments'
import { NewReviewComment } from './NewReviewComment'
import { ReviewProvider, ReviewContext } from './ReviewProvider'
import { Collapse, Button } from 'reactstrap'

export const Review = (props) => {
    const { review, reload, setReload } = props
    const [isOpen, setIsOpen] = useState(false);
    const [singleReviewComments, setSingleReviewComments] = useState([])
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        getSingleReviewComments(review.id)
    },[])

    const getSingleReviewComments = (reviewId) => {
        return fetch(`http://localhost:8000/reviewcomments?review_id=${reviewId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(response => response.json())
            .then(setSingleReviewComments)
      }

    return (
        <div className="review mb-2">
        <div className="review-header ml-4 mt-2"><h2 className="review-subject">{review.title}</h2></div>
        <div className="d-flex">
        <div className="user align-content-center m-2 col-2">
          <img className="profilepic rounded-circle" src={review.user_id.profile_image_url} />
          <h6>{review.user_id && review.user_id.user_id.username}</h6>
          <Button className="btn-sm" color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>{singleReviewComments.count} Comments</Button>
        </div>
        <div className="review-text col-8"><h5>{review.text}</h5></div>
        </div>
        <div className="review-comments offset-2 col-8">
        <Collapse isOpen={isOpen}>
            <ReviewProvider>
            <ReviewComments review={review} {...props}/>
            <NewReviewComment review={ review} {...props} />
            </ReviewProvider>
        </Collapse>
            </div>
        </div>
    )
}