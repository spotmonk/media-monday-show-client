import React, { useState } from 'react'

export const EpisodeContext = React.createContext()

export const EpisodeProvider = (props) => {
  const [latest, setLatest] = useState([])
  const [allEpisodes, setAllEpisodes] = useState([])
  const [singleEpisode, setSingleEpisode] = useState([])

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

  const getSingleEpisode = (episodeId) => {
    return fetch(`http://localhost:8000/episodes/${episodeId}`, {
      headers:{
          "Authorization": `Token ${localStorage.getItem("token")}`
      }
  })
      .then(response => response.json())
      .then(setSingleEpisode)
  }

return (
  <EpisodeContext.Provider value={{
      latest,
      setLatest,
      getLatestEpisode,
      allEpisodes,
      setAllEpisodes,
      getAllEpisodes,
      singleEpisode,
      setSingleEpisode,
      getSingleEpisode
  }} >
      { props.children }
  </EpisodeContext.Provider>
)
}
