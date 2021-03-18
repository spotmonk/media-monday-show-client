import { Button } from 'reactstrap'
import React, {useContext} from 'react'
import { WatchContext } from './WatchProvider'

export const WatchedButton = (props) => {
    const { watchedId, getWatchList, size } = props
    const { getFilteredWatched, removeWatched} = useContext(WatchContext)


    const removeFromWatched = () => {
        removeWatched(watchedId)
        .then(getWatchList())
        .then(getFilteredWatched(localStorage.getItem('user_id'),'',''))
    }

    return (
        <Button onClick={removeFromWatched} size={size} color="danger">Remove Watched</Button>
    )
}