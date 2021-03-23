import React, { useState } from 'react'

export const TopListContext = React.createContext()

export const TopListProvider = (props) => {
    const [topList, setTopList] = useState([])
    const [list, setList] = useState([])
    const [allLists, setAllLists] = useState([])
    const [userList, setUserList] = useState([])

    const createList = (title, number) => {
        return fetch(`http://localhost:8000/toplists/new?title=${title}&number=${number}`, {
            headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }})
            .then(response => response.json())
            .then(setTopList)
    }

    const getAllLists = () => {
        return fetch(`http://localhost:8000/toplists`, {
            headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }})
            .then(response => response.json())
            .then(setAllLists)
    }


    const getList = (listId) => {
        return fetch(`http://localhost:8000/toplists/${listId}`, {
            headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }})
            .then(response => response.json())
            .then(setList)
    }

    const getUserLists = (userId) => {
        return fetch(`http://localhost:8000/toplists?user_id=${userId}`, {
            headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }})
            .then(response => response.json())
            .then(setUserList)
    }

        return (
            <TopListContext.Provider value={{
            list,
            setList,
            getList,
            createList,
            allLists,
            setAllLists,
            getAllLists,
            topList,
            setTopList,
            userList,
            setUserList,
            getUserLists
            }} >
                { props.children }
            </TopListContext.Provider>
          )
    }
