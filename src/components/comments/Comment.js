import React, { useContext, useEffect } from 'react'
import { UserContext } from '../users/UserProvider'
import './comment.scss'

export const Comment = (props) => {
  const { comment } = props

  return (
    <>
    {comment.user_id && 
      <div className="comment item_direction d-flex" >
        <div className="user align-content-center m-2 col-4">
          <img className="profilepic rounded-circle" src={comment.user_id.profile_image_url} />
          <h6 >{comment.user_id.user_id && comment.user_id.user_id.username}</h6>
        </div>
        <div className="comment-text col-7 m-2">
          <p>{comment.text}</p>
        </div>
      </div>
    }
    </>
  )

}
