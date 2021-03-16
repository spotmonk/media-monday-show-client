import React, { useContext, useState, useEffect } from 'react'
import { MediaContext } from './MediaProvider'
import { Button } from 'reactstrap'
import './media.scss'

export const MediaSearch = () => {
    const { media, getMedia } = useContext(MediaContext)
    const [searchTerms, setSearchTerms] = useState("")
    
    useEffect(() => {
        search(searchTerms)
          },[searchTerms])

    const search = () => {
        getMedia(searchTerms)
    }

    const searchMore = () => {
        getMedia(searchTerms, true)
        .then(search(searchTerms))
    }
    return (<div className="text-center">
        <h1>Search for a TV Show or Movie</h1>
        <input type="text" value={searchTerms} onChange={e => setSearchTerms(e.target.value)} name="search" className="form-control col-4 offset-4" placeholder="Taskmaster" />
        <div><h6  className="m-2" style={{ display: 'inline' }}>Not seeing what you're looking for?</h6><Button onClick={searchMore}>Search Deeper</Button></div>
        <div className="media-div row">
                {media.count > 0 && media.results.map(m => <div className="mediaBlock col-lg-4 mb-1 ">
                <img className="poster" src={m.poster_url} />
                <div className="textBlock text-center">
                <div className="mediaTitle">{m.title}</div>
                <div className="mediaReleaseDate">{m.release_date}</div>
                <div className="mediadescription">{m.media_type} - {m.description}</div>
                </div>
                </div>)}
        </div>
        </div>
    )
}