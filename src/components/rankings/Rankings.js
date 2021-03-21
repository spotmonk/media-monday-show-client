import { Button } from 'reactstrap'
import React, { useContext, useEffect, useState } from 'react'
import { RankingItem } from './RankingItem'
import { RankingProvider, RankingsContext } from './RankingProvider'
import { TopListContext } from '../toplist/ToplistProvider'
import './ranking.scss'


export const Rankings = (props) => {
    const {ranked, getRanked, unranked, getUnranked} =  useContext(RankingsContext)
    const [refresh, setRefresh ] = useState(false)
    const [listNumber, setListNumber] = useState(0)
    const [listTitle, setListTitle] = useState('')
    const { topList, createList } = useContext(TopListContext)

    useEffect(()=> {
        getRanked()
        getUnranked()
    }, [refresh])

    const makeList = () => {
        createList(listTitle, listNumber)
    }

    useEffect(() => {
        if (topList.id){
            props.history.push(`/topList/${topList.id}`)
        }
    },[topList])

    return(
        <div className="rankings row-wrap d-flex">
            <div className={`unranked ${unranked  ? 'col-4' : 'col-3'}`}>
                <h2 className="text-center">Unranked Items</h2>
                {unranked && unranked.map(item => <RankingProvider><RankingItem refresh={refresh} count={ranked.length} setRefresh={setRefresh} item={item}/></RankingProvider>) }</div>
            <div className="ranked col-4"><h2 className="text-center">Ranked Items</h2>
                {ranked && ranked.map(item => <RankingProvider> <RankingItem refresh={refresh} setRefresh={setRefresh} count={ranked.length} item={item}/></RankingProvider>) }</div>
            <div className="toplist text-center col-3">
            <h2 className="text-center">Create A List</h2>
            <h4>List Title</h4>
            <div><input type="text" class="text-center col-12 form-control" onChange={(e => setListTitle(e.target.value) )} defaultValue={listTitle} /></div>
            <h4>Number in List</h4>
            <div><input style={{width:'4rem'}} type="number" class="number-input offset-5 form-control" onChange={(e => setListNumber(e.target.value) )} defaultValue={listNumber} /></div>
            <Button className="m-4 btn-lg" onClick={makeList} color="primary">Create</Button>
            </div>
        </div>
    )
}