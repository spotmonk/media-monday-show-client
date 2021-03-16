import React, { useContext, useEffect } from 'react'
import { AuthedEpisodeEmbed } from '../episode/authedEpisodeEmbed.js'
import { EpisodeContext } from '../episode/EpisodeProvider.js'
import { MediaContext } from '../media/MediaProvider.js'
import { AuthedMultiMediaDisplay } from '../media/AuthedMultiMediaDisplay.js'
import './homeAuthed.scss'
import { EpisodeCommentProvider } from '../episodeComments/EpisodeCommentsProvider.js'
import { UserProvider } from '../users/UserProvider.js'
import { EpisodeComments } from '../episodeComments/EpisodeComments.js'
import { WatchProvider } from '../status/WatchProvider.js'

export const HomeAuthed = (props) => {

  const {latest, getLatestEpisode, singleEpisode, getSingleEpisode } = useContext(EpisodeContext)
  const {latestMedia, getLatestMedia, windowedMedia, getWindowedMedia } = useContext(MediaContext)
  const { history } = props

  useEffect(() => {
     loadStuff()
      },[])
    
  useEffect(() => {
    getWindowedMedia(singleEpisode.start_date)
      },[singleEpisode])
  
  const loadStuff = () => {
    if (props.match.params.episodeId) {
      getSingleEpisode(props.match.params.episodeId)
    }
    else {
      getLatestEpisode()
      getLatestMedia()
    }
  }
  return(<div className="home d-flex flex-wrap row home">
    <div className="unAuthedEpisode col-4 ">
    {latest.id || singleEpisode.id ? <AuthedEpisodeEmbed history={history} episodeId={props.match.params.episodeId} episode={props.match.params.episodeId ? singleEpisode: latest}/> : <></>}
    <div className="comments">
      <UserProvider>
        < EpisodeCommentProvider>
          {latest.id || singleEpisode.id ? <EpisodeComments episodeId={props.match.params.episodeId ? singleEpisode.id: latest.id} /> : <></>}
        </EpisodeCommentProvider>
      </UserProvider>
    </div>
    </div>
    <div className="mediaList d-flex row-wrap row col-8 mt-2">
      <WatchProvider>
      {latestMedia && <AuthedMultiMediaDisplay media={props.match.params.episodeId ? windowedMedia : latestMedia}/>}
      </WatchProvider>
    </div>
  </div>
  )
}
