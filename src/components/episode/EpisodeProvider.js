import React, { useState } from 'react'

export const EpisodeContext = React.createContext()

export const EpisodeProvider = (props) => {
  const [latest, setLatest] = useState([])
  const [allEpisodes, setAllEpisodes] = useState([])

  const getLatestEpisode = () => {
    return fetch("http://localhost:8000/episodes/latest", {
    })
        .then(response => response.json())
        .then(setLatest)
}

  const getAllEpisodes = () => {
    return fetch("http://localhost:8000/episodes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
        .then(setAllEpisodes)
}


return (
  <EpisodeContext.Provider value={{
      latest,
      setLatest,
      getLatestEpisode,
      allEpisodes,
      setAllEpisodes,
      getAllEpisodes
  }} >
      { props.children }
  </EpisodeContext.Provider>
)
}
