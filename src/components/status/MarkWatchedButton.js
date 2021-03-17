import { Button } from 'reactstrap'
import React, {useContext} from 'react'
import { WatchContext } from './WatchProvider'

export const MarkWatchedButton = (props) => {
    const { mediaId, toWatchId, getWatchList, size } = props
    const { addWatched, getToWatch, removeToWatch} = useContext(WatchContext)

    const addWatchedRemoveToWatch = () => {
        addtoWatched()
        removeFromQueue()
    }

    const addtoWatched = () => {
        const watched = {
            "user_id": localStorage.getItem('user_id'),
            "media_id": mediaId
        }
        addWatched(watched)
        
    }

    const removeFromQueue = () => {
        removeToWatch(toWatchId)
        .then(getWatchList())
        .then(getToWatch(localStorage.getItem('user_id'),'',''))
    }

    return (
        <Button onClick={addWatchedRemoveToWatch} size={size} color="warning">Mark Watched</Button>
    )
}