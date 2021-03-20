import React, { useContext, useEffect, useState } from 'react'
import { RankingItem } from './RankingItem'
import { RankingProvider, RankingsContext } from './RankingProvider'


export const Rankings = () => {
    const {ranked, getRanked, unranked, getUnranked} =  useContext(RankingsContext)
    const [refresh, setRefresh ] = useState(false)
    
    useEffect(()=> {
        getRanked()
        getUnranked()
    }, [refresh])
    return(
        <div className="rankings d-flex">
            <div className={`unranked ${unranked  ? 'col-4' : 'col-3'}`}>
                <h2 className="text-center">Unranked Items</h2>
                {unranked && unranked.map(item => <RankingProvider><RankingItem refresh={refresh} count={ranked.length} setRefresh={setRefresh} item={item}/></RankingProvider>) }</div>
            <div className="ranked col-4"><h2 className="text-center">Ranked Items</h2>
                {ranked && ranked.map(item => <RankingProvider> <RankingItem refresh={refresh} setRefresh={setRefresh} count={ranked.length} item={item}/></RankingProvider>) }</div>
            <div className="toplist col-3">
            <h2 className="text-center">Create A List</h2>
            </div>
        </div>
    )
}