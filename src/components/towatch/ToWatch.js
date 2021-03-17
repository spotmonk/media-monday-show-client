import React, { useContext, useEffect, useState } from 'react'
import { WatchContext } from '../status/WatchProvider'
import { ToWatchButton } from '../status/ToWatchButton'
import { MarkWatchedButton } from '../status/MarkWatchedButton'


export const ToWatch = () =>{
    const {toWatch, getToWatch, watchlist, getWatchList} = useContext(WatchContext)
    const [searchTerms, setSearchTerms ] = useState("")
    const [media, setMedia ] = useState("")
    
    useEffect(()=> {
        getWatchList()
        .then(getToWatch(localStorage.getItem('user_id'), searchTerms, media))
    }, [searchTerms, media])

    useEffect(() => {
        getToWatch(localStorage.getItem('user_id'), searchTerms, media)
    },[watchlist, media])

    return(<> 
        <input type="text" value={searchTerms} onChange={e => setSearchTerms(e.target.value)} name="search" className="form-control col-4 offset-4" placeholder="Taskmaster" />
        <select className="form-control col-2 offset-5" onChange={e => setMedia(e.target.value)}>
        <option value="">All</option>
        <option value="TV">TV Shows</option>
        <option value="Movie">Movies</option>
        </select>
        <div className="media-div p-4 d-flex flex-wrap">
        {toWatch.count > 0 && toWatch.results.map(tw => (
            <div className="col-sm-3 mb-4 ">
            <div className="show-image">
                <div className="image">
                    <div className="overlay">
                    <img className="poster" src={tw.media_id.poster_url} /></div>
            </div>
            <div className="btndiv">
            <div className="mb-4">{toWatch.count > 0 && <ToWatchButton size="lg" className="toWatchButton" getWatchList={getWatchList} mediaId={tw.media_id.id} toWatch={watchlist.toWatch} watched={watchlist.watched}/>}</div>
            <div><MarkWatchedButton getWatchList={getWatchList} toWatchId={tw.id} mediaId={tw.media_id.id} size="lg" /></div>
            </div>
            </div>
            <div className="textBlock text-center">
            <div className="mediaTitle">{tw.media_id.title}</div>
            <div className="mediaReleaseDate">{tw.media_id.release_date}</div>
            <div className="mediadescription">{tw.media_id.media_type} - {tw.media_id.description}</div>
            </div>
               </div>
        ))}
        </div>
    </>)
}