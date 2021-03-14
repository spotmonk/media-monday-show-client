import React, { useCallback, useContext, useEffect } from 'react'
import { EpisodeContext } from './EpisodeProvider'
import { Input } from 'reactstrap'
import './episode.scss';
import { useHistory } from 'react-router-dom';

export const AuthedEpisodeEmbed = (props) => {
    const { episode, history, episodeId } = props
    const {allEpisodes, getAllEpisodes} = useContext(EpisodeContext)

    useEffect(() => {
       getAllEpisodes()
    
          },[])

    const goToEpisode = (e) => {
        history.push(`/episode/${e.target.value}`)
    }

    return (
        <div className="episodeDiv text-center">
            <div className="w-100 mb-3">
            
            <Input onChange={goToEpisode} type="select" value={episodeId} name="select" id="exampleSelect">
            {allEpisodes.slice(0).reverse().map(e => <option value={e.id}>{e.title}</option>)}
            </Input>
            </div>
            <iframe src={`https://anchor.fm/media-monday-show/embed/episodes/${episode.url}`} title="Podcast Embed" height="100px" width="300px" frameborder="0" scrolling="no"></iframe>
            <div className="p-2 w-100 description" dangerouslySetInnerHTML={{__html: episode.blurb}}></div>
        </div>
    )
}
