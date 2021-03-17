import React, { useContext, useEffect } from 'react'
import { Button } from 'reactstrap'
import { WatchContext } from './WatchProvider'
import { Link } from 'react-router-dom'

export const ToWatchButton = (props) => {
    const { mediaId, watched, toWatch, getWatchList, size } = props
    const { addToWatch, removeToWatch, getToWatch} = useContext(WatchContext)
    
    
    useEffect(() => {
           },[toWatch])

    const addToQueue = () => {
        const toWatch = {
            "user_id": localStorage.getItem('user_id'),
            "media_id": mediaId
        }
        addToWatch(toWatch)
        .then(getWatchList())
    }

    const removeFromQueue = (toWatchId) => {
        removeToWatch(toWatchId)
        .then(getWatchList())
        .then(getToWatch(localStorage.getItem('user_id'),'',''))
    }

    const buttonText = () => {
        const towatchResult = toWatch.filter(tw => tw.media_id.id === mediaId)
        const watchedResult = watched.filter(wl => wl.media_id.id === mediaId)
        if (watchedResult.length > 0)
            {
                return <Link to='/watched'><Button className={`btn-${size}`} color="success" > Watched</Button></Link>
            }
            else if (towatchResult.length > 0)
            { 
                return <Button className={`btn-${size}`} color="primary" onClick={() => removeFromQueue(towatchResult[0].id)}>In Queue</Button> 
            }
            else
            {
                return <Button className={`btn-${size}`} color="info" onClick={addToQueue}>Add To Queue</Button>
            }
    }
    return (<>
        
            {toWatch && buttonText()}

        
    </>)
}