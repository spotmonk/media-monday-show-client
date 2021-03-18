import React, { useContext, useEffect, useState } from 'react'
import { WatchContext } from '../status/WatchProvider'
import { WatchedButton } from '../status/WatchedButton'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'


export const Watched = () =>{
    const {filteredWatched, getFilteredWatched, watchlist, getWatchList} = useContext(WatchContext)
    const [searchTerms, setSearchTerms ] = useState("")
    const [media, setMedia ] = useState("")
    
    useEffect(()=> {
        getWatchList()
        .then(getFilteredWatched(localStorage.getItem('user_id'), searchTerms, media))
    }, [searchTerms, media])

    useEffect(() => {
        getFilteredWatched(localStorage.getItem('user_id'), searchTerms, media)
    },[watchlist, media])

    return(<> 
        <input type="text" value={searchTerms} onChange={e => setSearchTerms(e.target.value)} name="search" className="form-control col-4 offset-4" placeholder="Taskmaster" />
        <select className="form-control col-2 offset-5" onChange={e => setMedia(e.target.value)}>
        <option value="">All</option>
        <option value="TV">TV Shows</option>
        <option value="Movie">Movies</option>
        </select>
        <div className="media-div p-4 d-flex flex-wrap">
        {filteredWatched.count > 0 && filteredWatched.results.map(w => (
            <div className="col-sm-3 mb-4 ">
            <div className="show-image">
                <div className="image">
                    <div className="overlay">
                    <img className="poster" src={w.media_id.poster_url} /></div>
            </div>
            <div className="btndiv text-center">
            <div className="m-3"><Link to={`editwatched/${w.id}`}><Button color="light">Edit Watched Details</Button></Link></div>
            <div><WatchedButton getWatchList={getWatchList} watchedId={w.id} mediaId={w.media_id.id} size="lg" /></div>
            </div>
            </div>
            <div className="textBlock text-center">
            <div className="mediaTitle">{w.media_id.title}</div>
            <div className="mediaReleaseDate">{w.media_id.release_date}</div>
            <div className="mediadescription">{w.media_id.media_type} - {w.media_id.description}</div>
            </div>
               </div>
        ))}
        </div>
    </>)
}