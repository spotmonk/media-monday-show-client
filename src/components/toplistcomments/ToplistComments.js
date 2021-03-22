import React, { useContext, useEffect, useState } from 'react'
import { TopListCommentsContext } from './ToplistCommentsProvider'

export const ToplistComments = (props) => {
    const {toplistComments, getTopListComments} = useContext(TopListCommentsContext)
    const { reload } = props
    

    useEffect(() => {
        getTopListComments(props.match.params.listId)
    },[reload])

    return(<>
        <h2 className="text-center"> Comments</h2>
        {toplistComments.count > 0 && toplistComments.results.map(tlc =>  
      <div className="comment mb-2 d-flex" >
        <div className="user align-content-center m-2 col-4">
          <img className="profilepic rounded-circle" src={tlc && tlc.user_id.profile_image_url} />
          <h6>{tlc.user_id && tlc.user_id.user_id.username}</h6>
        </div>
        <div className="comment-text m-2">
          <p>{tlc.text}</p>
        </div>
      </div>
    )}
    
    </>
    )
}