import React, { useState } from 'react'

export const RankingsContext = React.createContext()

export const RankingProvider = (props) => {
    const [unranked, setUnranked] = useState([])
    const [ranked, setRanked] = useState([])

    const getRanked = () => {
        return fetch('http://localhost:8000/rankings', {
            headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }})
            .then(response => response.json())
            .then(setRanked)
        }

    const getUnranked = () => {
        return fetch('http://localhost:8000/unranked', {
            headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
        })
            .then(response => response.json())
            .then(setUnranked)
    }

    const deleteRanked = (rankedId) => {
        return fetch(`http://localhost:8000/rankings/${rankedId }`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
          })
            .then(res => res.json())
            .then(getRanked)
        }
    
        const newRanking = (ranking) => {
            return fetch('http://localhost:8000/rankings', {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ranking)
        })
    }
        const updateRanking = (ranking) => {
            return fetch('http://localhost:8000/rankings', {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ranking)
        })
} 
        const increaseRanking = (rankingId) => {
            return fetch(`http://localhost:8000/rankings/increase?id=${rankingId}`, {
                headers:{
                "Authorization": `Token ${localStorage.getItem("token")}`
            }})
                .then(response => response.json())
                .then(getRanked)
        }

        const decreaseRanking = (rankingId) => {
            return fetch(`http://localhost:8000/rankings/decrease?id=${rankingId}`, {
                headers:{
                "Authorization": `Token ${localStorage.getItem("token")}`
            }})
                .then(response => response.json())
                .then(getRanked)
        }

        const insertRanking = (rankingId, ranking) => {
            return fetch(`http://localhost:8000/rankings/insert?id=${rankingId}&ranking=${ranking}`, {
                headers:{
                "Authorization": `Token ${localStorage.getItem("token")}`
            }})
                .then(response => response.json())
                .then(getRanked)
        }


        return (
            <RankingsContext.Provider value={{
              ranked,
              setRanked,
              getRanked,
              unranked,
              setUnranked,
              getUnranked,
              deleteRanked,
              newRanking,
              updateRanking,
              increaseRanking,
              decreaseRanking,
              insertRanking
            }} >
                { props.children }
            </RankingsContext.Provider>
          )
    }