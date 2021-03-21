import React, { useState } from 'react'

export const TopListContext = React.createContext()

export const TopListProvider = (props) => {
    const [topList, setTopList] = useState([])

    const createList = (title, number) => {
        return fetch(`http://localhost:8000/toplists/new?title=${title}&number=${number}`, {
            headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }})
            .then(response => response.json())
            .then(setTopList)
    }


        return (
            <TopListContext.Provider value={{
            topList,
            setTopList,
            createList
            }} >
                { props.children }
            </TopListContext.Provider>
          )
    }