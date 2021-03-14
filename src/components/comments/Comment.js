import React, { useContext, useEffect } from 'react'
import { UserContext } from '../users/UserProvider'
import './comment.scss'

export const Comment = (props) => {
  const { comment } = props
  const {user, getUser} = useContext(UserContext)

  useEffect(() => {
    getUser(comment.user_id)
       },[comment])

  return (
    <>
    {user && 
      <div className="comment item_direction d-flex" >
        <div className="user align-content-center m-2 col-4">
          <img className="profilepic rounded-circle" src={user.profile_image_url} />
          <h6 className="text-center">{user.user_id && user.user_id.username}</h6>
        </div>
        <div className="comment-text col-7 m-2">
          <p>{comment.text}</p>
        </div>
      </div>
    }
    </>
  )

}
