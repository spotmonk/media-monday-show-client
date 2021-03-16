import React, { useState } from 'react'

export const WatchContext = React.createContext()

export const WatchProvider = (props) => {
    const [watchlist, setWatchlist ] = useState([])


    const getWatchList = () => {
        return fetch("http://localhost:8000/users/watchlist", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(response => response.json())
            .then(setWatchlist)
      }

    const addToWatch = (newToWatch) => {
        return fetch("http://localhost:8000/towatch", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newToWatch)
        })
        .then(getWatchList())
    }

    const removeToWatch = (toWatchId) => {
        return fetch(`http://localhost:8000/towatch/${toWatchId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            },
        })
    }





    return (
    <WatchContext.Provider value={{
        watchlist,
        setWatchlist,
        getWatchList,
        addToWatch,
        removeToWatch
    }} >
        { props.children }
    </WatchContext.Provider>
    )
}