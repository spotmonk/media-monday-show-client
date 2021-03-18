import React, { useState } from 'react'

export const WatchContext = React.createContext()

export const WatchProvider = (props) => {
    const [watchlist, setWatchlist ] = useState([])
    const [toWatch, setToWatch] = useState([])
    const [watched, setWatched] = useState([])
    const [filteredWatched, setFilteredWatched] = useState([])

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
        .then(getWatchList())
        
    }

    const getToWatch = (userId, searchTerm, media) => {
        return fetch(`http://localhost:8000/towatch?user_id=${userId}&search=${searchTerm}&media=${media}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(response => response.json())
            .then(setToWatch)
      }


      const addWatched = (newWatched) => {
        return fetch("http://localhost:8000/watched", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newWatched)
        })
        .then(getWatched())
    }

    const getWatched = () => {
        return fetch("http://localhost:8000/watched", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(response => response.json())
            .then(setWatched)
      }
    
    const getFilteredWatched = (userId, searchTerm, media) => {
        return fetch(`http://localhost:8000/watched?user_id=${userId}&search=${searchTerm}&media=${media}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(response => response.json())
            .then(setFilteredWatched) 
    }

    const removeWatched = (WatchedId) => {
        return fetch(`http://localhost:8000/watched/${WatchedId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            },
        })
        .then(getWatched())
        
    }

    
    return (
    <WatchContext.Provider value={{
        watchlist,
        setWatchlist,
        getWatchList,
        addToWatch,
        removeToWatch,
        toWatch,
        setToWatch,
        getToWatch,
        watched,
        filteredWatched,
        setWatched,
        getWatched,
        getFilteredWatched,
        addWatched,
        removeWatched
    }} >
        { props.children }
    </WatchContext.Provider>
    )
}