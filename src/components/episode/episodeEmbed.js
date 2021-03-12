import React from 'react'
import './episode.scss';

export const EpisodeEmbed = (props) => {
    const { episode } = props

    return (
        <div className="episodeDiv text-center">
            <div className="w-100"><h2>{episode.title}</h2></div>
            <iframe src={`https://anchor.fm/media-monday-show/embed/episodes/${episode.url}`} title="Podcast Embed" height="100px" width="300px" frameborder="0" scrolling="no"></iframe>
            <div className="p-2 w-100 description" dangerouslySetInnerHTML={{__html: episode.blurb}}></div>
        </div>
    )
}