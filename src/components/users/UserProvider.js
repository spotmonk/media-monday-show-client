import React, { useState } from 'react'

export const UserContext = React.createContext()

export const UserProvider = (props) => {
  const [users, setUsers] = useState([])
  const [user, setUser]= useState([])
  const [currentUser, setCurrentUser] = useState([])
  


  const getAllUsers = () => {
    return fetch("http://localhost:8000/users", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
        .then(setUsers)
}

const getCurrentUser = () => {
  return fetch("http://localhost:8000/users/current", {
      headers:{
          "Authorization": `Token ${localStorage.getItem("token")}`
      }
  })
      .then(response => response.json())
      .then(setCurrentUser)
}

const getUser = (userId) => {
  return fetch(`http://localhost:8000/users/${userId}`, {
      headers:{
          "Authorization": `Token ${localStorage.getItem("token")}`
      }
  })
      .then(response => response.json())
      .then(setUser)
}




return (
  <UserContext.Provider value={{
      users,
      setUsers,
      getAllUsers,
      user,
      setUser,
      getUser,
      currentUser,
      setCurrentUser,
      getCurrentUser,
  }} >
      { props.children }
  </UserContext.Provider>
)
}
