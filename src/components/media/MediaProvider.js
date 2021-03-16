import React, { useState } from 'react'

export const MediaContext = React.createContext()

export const MediaProvider = (props) => {
  const [latestMedia, setLatestMedia] = useState([])
  const [allMedia, setAllMedia] = useState([])
  const [windowedMedia, setWindowedMedia] = useState([])
  const [media, setMedia] = useState([])

  const getLatestMedia = () => {
    return fetch("http://localhost:8000/media/latest", {
    })
        .then(response => response.json())
        .then(setLatestMedia)
}

  const getAllMedia = () => {
    return fetch("http://localhost:8000/media", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
        .then(setAllMedia)
}

  const getWindowedMedia = (startDate)=> {

    return fetch(`http://localhost:8000/media/window?start_date=${startDate}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
        .then(setWindowedMedia)

  }

  const getMedia = (name, more) => {
    if (!more) {
    return fetch(`http://localhost:8000/media?name=${name}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
        .then(setMedia)
    }
    else {
      return fetch(`http://localhost:8000/media?name=${name}&more=true`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
        .then(setMedia)
    }
    } 
    

return (
  <MediaContext.Provider value={{
      latestMedia,
      setLatestMedia,
      getLatestMedia,
      allMedia,
      setAllMedia,
      getAllMedia,
      windowedMedia,
      setWindowedMedia,
      getWindowedMedia,
      media,
      getMedia,
      setMedia
  }} >
      { props.children }
  </MediaContext.Provider>
)
}
