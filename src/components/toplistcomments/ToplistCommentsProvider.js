import React, { useState } from 'react'

export const TopListCommentsContext = React.createContext()

export const TopListCommentsProvider = (props) => {
    const [toplistComments, setToplistComments ] = useState([])

    const getTopListComments = (toplistId) => {
        return fetch(`http://localhost:8000/toplistcomments?toplist_id=${toplistId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(response => response.json())
            .then(setToplistComments)
      }

    const postNewTopListComment =  (comment) => {
        return fetch("http://localhost:8000/toplistcomments", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
            .then(getTopListComments(comment.toplist_id))
    }
    
    return (
    <TopListCommentsContext.Provider value={{
        toplistComments,
        setToplistComments,
        getTopListComments,
        postNewTopListComment
    }} >
        { props.children }
    </TopListCommentsContext.Provider>
    )
}