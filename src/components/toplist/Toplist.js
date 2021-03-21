import React, { useContext, useEffect } from 'react'
import { TopListContext } from './ToplistProvider'
import { Link } from 'react-router-dom'


export const TopList = (props) => {
  const { list, getList } = useContext(TopListContext)

  useEffect(() => {
    getList(props.match.params.listId)
  },[])

  return (
    <>
    {list && 
    <div>
      <h1>{list.title}</h1>
      <h4>from {list.user_id && list.user_id.user_id.username}</h4>
      {list.toplist_items && list.toplist_items.map(item => <>
        <div className="ranking-item m-2 w-25 d-flex">
        <div><h1 className="mt-4">{item.ranking}</h1></div>
        <Link to={`/media/${item.media_id.id}`} style={{ textDecoration: 'none', color: 'black' }}><div className="ranking-item-poster"><img className="p-2" src={item.media_id.poster_url}/></div></Link>
        <div className="mt-3"><h4>{item.media_id.title}</h4></div>
        </div>
        </>)}
    </div>}
    </>
  )
}
