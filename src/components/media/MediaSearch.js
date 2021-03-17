import React, { useContext, useState, useEffect } from 'react'
import { MediaContext } from './MediaProvider'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { WatchContext } from '../status/WatchProvider'
import { ToWatchButton } from '../status/ToWatchButton'
import './media.scss'

export const MediaSearch = () => {
    const { media, getMedia } = useContext(MediaContext)
    const {watchlist, getWatchList} = useContext(WatchContext)
    const [searchTerms, setSearchTerms] = useState("")
    
    useEffect(() => {
        if (searchTerms) {
        search(searchTerms)
        }
          },[searchTerms])

    const search = () => {
        getWatchList()
        .then(getMedia(searchTerms))
    }

    const searchMore = () => {
        getMedia(searchTerms, true)
        .then(search(searchTerms))
    }
    return (<div className="text-center">
        <h1>Search for a TV Show or Movie</h1>
        <input type="text" value={searchTerms} onChange={e => setSearchTerms(e.target.value)} name="search" className="form-control col-4 offset-4" placeholder="Taskmaster" />
        <div><h6  className="m-2" style={{ display: 'inline' }}>Not seeing what you're looking for?</h6><Button onClick={searchMore}>Search Deeper</Button></div>
        <div className="media-div p-4 row">
                {media.count > 0 && media.results.map(m =>
                <div className="col-lg-3 mb-1 ">
                <div class="show-image">
                    <div class="image">
                        <div class="overlay">
                        <img className="poster" src={m.poster_url} /></div>
                </div>
                <div className="btndiv">
                <ToWatchButton size="lg" className="toWatchButton" getWatchList={getWatchList} mediaId={m.id} toWatch={watchlist.toWatch} watched={watchlist.watched}/>
                </div>
                </div>
                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/media/${m.id}`}>
                <div className="textBlock text-center">
                <div className="mediaTitle">{m.title}</div>
                <div className="mediaReleaseDate">{m.release_date}</div>
                <div className="mediadescription">{m.media_type} - {m.description}</div>
                </div>
                </Link>
                   </div>)}
        </div>
        </div>
    )
}