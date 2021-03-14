import React from 'react'
import './authedMedia.scss'

export const AuthedMultiMediaDisplay = (props) => {
    const { media } = props

    return (
        <>
        {media.map(m => {
            return <div className="mediaBlock col-sm-3 mb-1 ">
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
