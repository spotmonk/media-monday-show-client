import React, { useEffect, useContext } from 'react'
import './authedMedia.scss'
import { ToWatchButton } from '../status/ToWatchButton.js'
import { WatchContext } from '../status/WatchProvider'
import { Link } from 'react-router-dom'


export const AuthedMultiMediaDisplay = (props) => {
    const {watchlist, getWatchList} = useContext(WatchContext)
    const { media } = props

    useEffect(() => {
        getWatchList()
          },[])

    useEffect(() => {

    },[watchlist])

    return (
        <>
        {media.map(m => ( 
           <div className="mediaBlock col-lg-3 mb-1 ">
           <div className="show-image">
               <div className="image">
                   <div className="overlay">
                   <img className="poster" src={m.poster_url} /></div>
           </div>
           <div className="btndiv">
           <ToWatchButton size="sm" className="toWatchButton" getWatchList={getWatchList} mediaId={m.id} toWatch={watchlist.toWatch} watched={watchlist.watched}/>
           </div>
           </div>
           <Link style={{ textDecoration: 'none', color: 'black' }} to={`/media/${m.id}`}>
                <div className="textBlock text-center">
                    <div className="mediaTitle">{m.title}</div>
                    <div className="mediaReleaseDate">{m.release_date}</div>
                <div className="mediadescription">{m.media_type} - {m.description}</div>
                </div>
           </Link>
           </div>
           
    ))}
        </>
    )
}
