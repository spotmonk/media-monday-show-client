import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../users/UserProvider'
import { TopListCommentsContext } from './ToplistCommentsProvider'


export const NewTopListComment = (props) => {
    const { toplist, reload, setReload } = props
    const [commentText, setCommentText] = useState("")
    const {postNewTopListComment } = useContext(TopListCommentsContext)
    const {user, getUser } = useContext(UserContext)

    useEffect(() => {
      getUser(localStorage.getItem('user_id'))
    },[])

    const makeNewComment =() => {
        const comment = {
            "toplist_id": toplist,
            "user_id": localStorage.getItem('user_id'),
            "text": commentText
        }
         postNewTopListComment(comment)
         .then(setReload(!reload))
         .then(setCommentText(''))
    }
  
    const handleKeyDown = (e)=> {
      if (e.key === 'Enter') {
      makeNewComment()    
    }
  }

    return (
    <>
    {user && 
      <div className="newCommentBox mt-3 item_direction d-flex" >
        <div className="user align-content-center m-2 col-4">
          <img className="profilepic rounded-circle" src={user.profile_image_url} />
          <h6>{user.user_id && user.user_id.username}</h6>
        </div>
        <div className="comment-text col-7 m-2">
        <fieldset>
                    <textarea value={commentText} onKeyDown={e=> handleKeyDown(e)} onChange={e => setCommentText(e.target.value)} name="comment" className="form-control" placeholder="This List is Great!" />
                </fieldset>
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