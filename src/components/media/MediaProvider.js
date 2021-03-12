import React, { useState } from 'react'

export const MediaContext = React.createContext()

export const MediaProvider = (props) => {
  const [latestMedia, setLatestMedia] = useState([])
  const [allMedia, setAllMedia] = useState([])

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


return (
  <MediaContext.Provider value={{
      latestMedia,
      setLatestMedia,
      getLatestMedia,
      allMedia,
      setAllMedia,
      getAllMedia
  }} >
      { props.children }
  </MediaContext.Provider>
)
}
