import React, { useState } from 'react'

export const EpisodeCommentContext = React.createContext()

export const EpisodeCommentProvider = (props) => {
  const [EC, setEC] = useState([])
  const [ecRes, setECRes] = useState([])

  const getEC = (episodeId) => {
    return fetch(`http://localhost:8000/episodecomments?episode_id=${episodeId}`, {
      headers:{
        "Authorization": `Token ${localStorage.getItem("token")}`
    }
    })
        .then(response => response.json())
        .then(setEC)
}

  const postNewComment =  (comment) => {
    return fetch("http://localhost:8000/episodecomments", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: comment
    })
        .then(res => res.json())
        .then(setECRes)
}

  const deleteComment = (commentId) => {
    return fetch(`http://localhost:8000/episodecomments/${commentId }`, {
    method: "DELETE",
    headers:{
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(res => res.json())
    .then(setECRes)
}

return (
  <EpisodeCommentContext.Provider value={{
     EC,
     setEC,
     getEC,
     ecRes,
     setECRes,
     postNewComment,
     deleteComment
  }} >
      { props.children }
  </EpisodeCommentContext.Provider>
)
}
