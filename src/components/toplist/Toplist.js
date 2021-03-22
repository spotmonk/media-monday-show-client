import React, { useContext, useEffect, useState } from 'react'
import { TopListContext } from './ToplistProvider'
import { Link } from 'react-router-dom'
import { TopListCommentsProvider } from '../toplistcomments/ToplistCommentsProvider'
import { ToplistComments } from '../toplistcomments/ToplistComments'
import { NewTopListComment } from '../toplistcomments/NewTopListComment'
import { UserProvider } from '../users/UserProvider'

export const TopList = (props) => {
  const { list, getList } = useContext(TopListContext)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    getList(props.match.params.listId)
  },[reload])

  return (
    <div className="d-flex single-list">
    {list && 
    <div className="col-4">
      <h1>{list.title}</h1>
      <h4>by {list.user_id && list.user_id.user_id.username}</h4>
      {list.toplist_items && list.toplist_items.map(item => <>
        <div className="ranking-item m-2 w-25 d-flex">
        <div><h1 className="mt-4">{item.ranking}</h1></div>
        <Link to={`/media/${item.media_id.id}`} style={{ textDecoration: 'none', color: 'black' }}><div className="ranking-item-poster"><img className="p-2" src={item.media_id.poster_url}/></div></Link>
        <div className="mt-3"><h4>{item.media_id.title}</h4></div>
        </div>
        </>)}
    </div>}
    <div>
    <div className="col-8 offset-1 mt-5 overflow-scroll review-panel toplist-comments">
    <div>
        <TopListCommentsProvider>
          <ToplistComments reload={reload} {...props} />
        </TopListCommentsProvider>
    </div>
    </div>
    <div className="newTLComment col-8 offset-1">
        <UserProvider>
        <TopListCommentsProvider>
          <NewTopListComment toplist={list.id} reload={reload} setReload={setReload} {...props} />
        </TopListCommentsProvider>
        </UserProvider>
    </div>
    </div>
    </div>
  )
}
