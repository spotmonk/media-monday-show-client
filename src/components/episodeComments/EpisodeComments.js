import React, { useContext, useEffect, useState } from 'react'
import { EpisodeCommentContext } from './EpisodeCommentsProvider'
import { Comment } from '../comments/Comment.js'
import { NewComment } from '../comments/NewComment.js'
import './episodeComment.scss'

export const EpisodeComments = (props) => {
  const { episodeId } = props
  const {EC, getEC} = useContext(EpisodeCommentContext)
  const [reload, setReload] = useState(true)

  useEffect(() => {
    getEC(episodeId)
       },[episodeId, reload])
  
  const reloadComments = () => {
    setReload(!reload)
    getEC(episodeId)
  }
  return (
    <>
    
    <div className="commentBox mt-4">
    {EC.results && EC.count > 0 ? EC.results.map(ec => < Comment comment={ec} />) : <h4 className="text-center">No Comments Yet</h4>}
    </div>
    <div className="newCommentBox mt-4">
    {episodeId && < NewComment reload={reloadComments} episodeId={episodeId} />}
    </div>
    </>
  )

}
