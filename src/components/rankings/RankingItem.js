import { Button } from 'reactstrap'
import React, { useContext, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './ranking.scss'
import { RankingsContext } from './RankingProvider'

export const RankingItem = (props) => {
    const {increaseRanking, decreaseRanking, insertRanking } = useContext(RankingsContext)
    const [ranking, setRanking ] = useState(0)
    const { item, count, refresh, setRefresh } = props 
    const modalDialog = useRef()

    const increase = () => {
        increaseRanking(item.id)
        setRefresh(!refresh)
        
    }

    const decrease = () => {
        decreaseRanking(item.id)
        setRefresh(!refresh)
    }

    const insert = () => {
        if (ranking > 0 && (ranking <= count + 1 || count == 0)) {
            console.warn("inserting")
            insertRanking(item.id, ranking)
            setRefresh(!refresh)
        }
        else {
            modalDialog.current.showModal()
        }

    }

    return (<>
        <dialog className="dialog" ref={modalDialog}>
                <div>Number Not Available</div>
                <button className="button--close" onClick={e => modalDialog.current.close()}>Close</button>
        </dialog>
       <div className="ranking-item m-2 d-flex">
            {item.ranking ?<div>
                {item.ranking > 1 ? <div><Button onClick={increase} color="success" className="w-100 h-auto"><i class="fas fa-arrow-up"></i></Button></div> : <></>}
                <h3 className="text-center">{item.ranking}</h3>
                {item.ranking === count ? <></> : <div><Button onClick={decrease} color="danger" className="w-100 h-auto"><i class="fas fa-arrow-down"></i></Button></div>}
                </div>
                :
                <div className="mt-4"><h4>Rank:</h4> 
                <input style={{width:'4rem'}} type="number" min="1" max={count + 1} class="text-center form-control m-1" onChange={(e => setRanking(e.target.value) )} defaultValue={item.ranking ? item.ranking : 0} />
                <div className="text-center"><Button onClick={insert} className="btn-sm">Insert</Button></div>
            </div>
            }
            <Link to={`/media/${item.media_id.id}`} style={{ textDecoration: 'none', color: 'black' }}><div className="ranking-item-poster"><img className="p-2" src={item.media_id.poster_url}/></div></Link>
            <div className="mt-3"><h4>{item.media_id.title}</h4></div>
        </div>
        </>
    )
}
