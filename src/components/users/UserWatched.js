import React, { useContext, useEffect, useState } from 'react'
import { WatchContext } from '../status/WatchProvider'
import { WatchedButton } from '../status/WatchedButton'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { RankingProvider } from '../rankings/RankingProvider'


export const UserWatched = (props) =>{
    const {filteredWatched, getFilteredWatched, watchlist, getWatchList} = useContext(WatchContext)
    const [searchTerms, setSearchTerms ] = useState("")
    const [media, setMedia ] = useState("")
    const { userId } = props
    useEffect(()=> {
        getWatchList()
        .then(getFilteredWatched(userId, searchTerms, media))
    }, [searchTerms, media])

    useEffect(() => {
        getFilteredWatched(userId, searchTerms, media)
    },[watchlist, media])

    return(<> 
        <div className="inline-block"><input type="text" value={searchTerms} onChange={e => setSearchTerms(e.target.value)} name="search" className="form-control col-4 offset-4" placeholder="Taskmaster" />
        <select className="form-control col-2 offset-5" onChange={e => setMedia(e.target.value)}>
        <option value="">All</option>
        <option value="TV">TV Shows</option>
        <option value="Movie">Movies</option>
        </select>
        </div>
        <div className="user-media-div p-1 d-flex flex-wrap">
        {filteredWatched.count > 0 && filteredWatched.results.map(w => (
            <div className="col-sm-4 mb-4 ">
            <div className="show-image">
                <div className="image">
                    <div className="overlay">
                    <img className="poster" src={w.media_id.poster_url} /></div>
            </div>
            <div className="btndiv text-center">
            </div>
            </div>
            <Link to={`/media/${w.media_id.id}`} style={{ textDecoration: 'none', color:'black' }} >
            <div className="textBlock text-center">
            <div className="mediaTitle">{w.media_id.title}</div>
            <div className="mediaReleaseDate">{w.media_id.release_date}</div>
            <div className="mediadescription">{w.media_id.media_type} - {w.media_id.description}</div>
            </div>
            </Link>
               </div>
        ))}
        </div>
    </>)
}