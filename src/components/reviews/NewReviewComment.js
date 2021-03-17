import React, { useContext, useState } from 'react'
import { ReviewContext } from './ReviewProvider'


export const NewReviewComment = (props) => {
    const { review, reload, setReload } = props
    const [commentText, setCommentText] = useState("")
    const {postNewReviewComment } = useContext(ReviewContext)

    const makeNewComment =() => {
        const comment = {
            "review_id": review.id,
            "user_id": localStorage.getItem('user_id'),
            "text": commentText
        }
         postNewReviewComment(comment)
         .then(setReload(!reload))
         .then(setCommentText(''))
        //  .then(window.location.reload(true));
    }
  
    const handleKeyDown = (e)=> {
      if (e.key === 'Enter') {
      makeNewComment()    
    }
  }

    return (
    <>
    {review && 
      <div className="newComment item_direction d-flex" >
        <div className="user align-content-center m-2 col-4">
          <img className="profilepic rounded-circle" src={review.user_id.profile_image_url} />
          <h6>{review.user_id && review.user_id.user_id.username}</h6>
        </div>
        <div className="comment-text col-7 m-2">
        <p><fieldset>
                    <textarea value={commentText} onKeyDown={e=> handleKeyDown(e)} onChange={e => setCommentText(e.target.value)} name="comment" className="form-control" placeholder="This Review is Great!" />
                </fieldset></p>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-dark" onClick={makeNewComment}>Add New Comment</button>
                </fieldset>
        </div>
      </div>
    }
    </>

    )
}