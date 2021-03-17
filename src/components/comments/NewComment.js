import React, { useContext, useEffect, useState } from 'react'
import { EpisodeCommentContext } from '../episodeComments/EpisodeCommentsProvider'
import { UserContext } from '../users/UserProvider'
import './comment.scss'

export const NewComment = (props) => {
  const { episodeId, reload } = props
  const {postNewComment} = useContext(EpisodeCommentContext)
  const {currentUser, getCurrentUser} = useContext(UserContext)
  const [commentText, setCommentText] = useState("")
  

  useEffect(() => {
    getCurrentUser()
    setCommentText("")
       },[episodeId])

  const makeNewComment =() => {
      const comment = {
        "episode_id": episodeId,
          "user_id": currentUser.id,
          "text": commentText
      }
       postNewComment(comment)
       .then(reload())
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
    {currentUser && 
      <div className="newComment item_direction d-flex" >
        <div className="user align-content-center m-2 col-4">
          <img className="profilepic rounded-circle" src={currentUser.profile_image_url} />
          <h6 className="text-center">{currentUser.user_id && currentUser.user_id.username}</h6>
        </div>
        <div className="comment-text col-7 m-2">
        <p><fieldset>
                    <textarea value={commentText} onKeyDown={e=> handleKeyDown(e)} onChange={e => setCommentText(e.target.value)} name="comment" className="form-control" placeholder="This Episode is Great!" />
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
