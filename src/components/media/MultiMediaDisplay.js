import React from 'react'
import './media.scss'

export const MultiMediaDisplay = (props) => {
    const { media } = props

    return (
        <>
        {media.map(m => {
            return <div className="mediaBlock col-lg-4 mb-1 ">
            <img className="poster" src={m.poster_url} />
            <div className="textBlock text-center">
            <div className="mediaTitle">{m.title}</div>
            <div className="mediaReleaseDate">{m.release_date}</div>
            <div className="mediadescription">{m.media_type} - {m.description}</div>
            </div>
            </div>
        })}
        </>
    )
}