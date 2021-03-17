import React, { useContext, useEffect, useState } from 'react'
import { ReviewContext } from '../reviews/ReviewProvider.js'
import { UserContext } from '../users/UserProvider'

export const NewReview = (props) => {
  const { mediaId, reload, setReload } = props
  const { postNewReview } = useContext(ReviewContext)
  const {currentUser, getCurrentUser} = useContext(UserContext)
  const [reviewText, setReviewText] = useState("")
  const [reviewSubject, setReviewSubject] = useState("")
  

  useEffect(() => {
    getCurrentUser()
    setReviewText("")
    setReviewSubject("")
       },[reload])

  const makeNewReview =() => {
      const review = {
        "media_id": mediaId,
        "user_id": currentUser.id,
        "text": reviewText,
        "title": reviewSubject
      }
       postNewReview(review)
       .then(setReload(!reload))
       .then(setReviewText(""))
       .then(setReviewSubject(""))
      //  .then(window.location.reload(true));
  }

  const handleKeyDown = (e)=> {
    if (e.key === 'Enter') {
    makeNewReview()    
  }
}

  return (
    <>
    {currentUser && 
      <div className="newComment item_direction d-flex" >
        <div className="user align-content-center m-2 col-4">
          <img className="profilepic rounded-circle" src={currentUser.profile_image_url} />
          <h6>{currentUser.user_id && currentUser.user_id.username}</h6>
        </div>
        <div className="comment-text col-7 m-2">
        <fieldset>
                    <input type="text" value={reviewSubject}  onChange={e => setReviewSubject(e.target.value)} name="subject" className="form-control" placeholder="Review Title" />
                </fieldset>
        <fieldset>
                    <textarea value={reviewText} onKeyDown={e=> handleKeyDown(e)} onChange={e => setReviewText(e.target.value)} name="review" className="form-control" placeholder="This Movie is Great!" />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-dark" onClick={makeNewReview}>Add New Review</button>
                </fieldset>
        </div>
      </div>
    }
    </>
  )

}
