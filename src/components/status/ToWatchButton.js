import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'reactstrap'
import { WatchContext } from './WatchProvider'

export const ToWatchButton = (props) => {
    const { mediaId, watched, toWatch, getWatchList, size } = props
    const { addToWatch, removeToWatch} = useContext(WatchContext)
    const [reload, setReload] = useState(true)
    
    useEffect(() => {
           },[toWatch, reload])

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
    }

    const buttonText = () => {
        const towatchResult = toWatch.filter(tw => tw.media_id === mediaId)
        const watchedResult = watched.filter(wl => wl.media_id === mediaId)
        if (towatchResult.length > 0)
            { 
                return <Button className={`btn-${size}`} color="primary" onClick={() => removeFromQueue(towatchResult[0].id)}>In Queue</Button> 
            }
            else if (watchedResult.length > 0)
            {
                return <Button className="btn-lg'">Watched</Button>
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