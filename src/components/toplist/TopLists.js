import React, { useContext, useEffect } from 'react'
import { TopListContext } from './ToplistProvider'
import { Link } from 'react-router-dom'
import './toplist.scss'


export const TopLists = (props) => {
  const { allLists, getAllLists} = useContext(TopListContext)

  useEffect(() => {
    getAllLists()
  },[])

  return (<>  
    <h2 className="text-center">Top Lists!</h2>
    <div className="d-flex toplists">
    {
    allLists.count > 0 && allLists.results.map(list => 
      <Link to={`/toplist/${list.id}`} style={{ textDecoration: 'none', color:'black' }}> <div className="m-2 p-2 text-center list-group">
      <h3>{list.title}</h3>
      <h6>Created By: {list.user_id.user_id.username}</h6>
      <h6>{list.toplist_items.length} Items</h6>
      </div>
      </Link>
      )
  }
  </div>
</>
  )

}
