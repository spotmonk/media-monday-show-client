import React, { useContext, useEffect, useState } from 'react'
import { MediaContext } from './MediaProvider'
import { ToWatchButton } from '../status/ToWatchButton'
import { WatchContext } from '../status/WatchProvider'
import { ReviewContext, ReviewProvider } from '../reviews/ReviewProvider'
import { NewReview } from '../reviews/NewReview'
import { UserProvider } from '../users/UserProvider'
import { Review } from '../reviews/Review'

export const SingleMedia = (props) => {
    const {singleMedia, getSingleMedia} = useContext(MediaContext)
    const { watchlist, getWatchList} = useContext(WatchContext)
    const [reload, setReload] = useState(true)
    const {reviews, getReviews} = useContext(ReviewContext)

    useEffect(() => {
        getSingleMedia(props.match.params.mediaId)
        getReviews(props.match.params.mediaId)
        getWatchList()
    },[reload])

    return (
        <div className="single-media d-flex ">
        <div className="left-panel mt-2 mb-4 col-lg-4"> 
        { singleMedia && 
             <div className="mb-1 ">
             <div class="show-image">
                 <div class="image">
                     <div class="overlay">
                     <img className="poster" src={singleMedia.poster_url} /></div>
             </div>
             <div className="btndiv">
             {watchlist && <ToWatchButton size="lg" className="toWatchButton" getWatchList={getWatchList} mediaId={singleMedia.id} toWatch={watchlist.toWatch} watched={watchlist.watched}/>}
             </div>
             </div>
             <div className="textBlock text-center">
             <div className="mediaTitle">{singleMedia.title}</div>
             <div className="mediaReleaseDate">{singleMedia.release_date}</div>
             <div className="mediadescription">{singleMedia.media_type} - {singleMedia.description}</div>
             </div>
                </div>
        }
        </div>
        <div className="right-panel col-8" >
            <div className="review-panel overflow-auto">
                    {reviews.count > 0 ? reviews.results.map(review =>
                     <UserProvider>
                   <Review review={review} reload={reload} setReload={setReload} />
                   </UserProvider>) : <h1 className="text-center" >No Reviews Yet</h1>} 
            </div>
            <div className="new-review mt-3">
            <UserProvider>
            <ReviewProvider>
                <NewReview mediaId={props.match.params.mediaId} reload={reload} setReload={setReload} />
            </ReviewProvider>
            </UserProvider>
            </div>
        </div> 
        </div>
    )
}