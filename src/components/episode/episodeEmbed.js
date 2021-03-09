import React from 'react'

export const EpisodeEmbed = (props) => {
    const { episode } = props

    return (
        <>
        <iframe src={`https://anchor.fm/media-monday-show/embed/episodes/${episode.url}`} title="Podcast Embed" height="204px" width="500px" frameborder="0" scrolling="no"></iframe>
        </>
    )
}