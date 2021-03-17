import React, { useState } from 'react'

export const ReviewContext = React.createContext()

export const ReviewProvider = (props) => {
    const [reviews, setReviews ] = useState([])
    const [reviewComments, setReviewComments ] = useState([])


    const getReviews = (mediaId) => {
        return fetch(`http://localhost:8000/reviews?media_id=${mediaId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(response => response.json())
            .then(setReviews)
      }

    
    const postNewReview =  (review) => {
    return fetch("http://localhost:8000/reviews", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })
        .then(getReviews(review.media_id))
    }

    const getReviewComments = (reviewId) => {
        return fetch(`http://localhost:8000/reviewcomments?review_id=${reviewId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(response => response.json())
            .then(setReviewComments)
      }


      const postNewReviewComment =  (comment) => {
        return fetch("http://localhost:8000/reviewcomments", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
            .then(getReviewComments(comment.review_id))

    }

    return (
    <ReviewContext.Provider value={{
        reviews,
        setReviews,
        getReviews,
        postNewReview,
        reviewComments,
        setReviewComments,
        getReviewComments,
        postNewReviewComment
    }} >
        { props.children }
    </ReviewContext.Provider>
    )
}