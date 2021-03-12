import React, { useContext, useEffect, useState } from 'react'
import { EpisodeEmbed } from '../episode/episodeEmbed.js'
import { EpisodeContext } from '../episode/EpisodeProvider.js'
import { MediaContext } from '../media/MediaProvider.js'
import { MultiMediaDisplay } from '../media/MultiMediaDisplay.js'
import './home.scss'

export const Home = () => {
  const {latest, getLatestEpisode } = useContext(EpisodeContext)
  const {latestMedia, getLatestMedia } = useContext(MediaContext)
    
  useEffect(() => {
    getLatestEpisode()
    getLatestMedia()
      },[])

  return(<div className="home d-flex flex-wrap row home">
    <div className="unauthedEpisode col-4 ">
    {latest && <EpisodeEmbed episode={latest}/>}
    </div>
    <div className="mediaList d-flex row-wrap row col-8 mt-2">
      {latestMedia && <MultiMediaDisplay media={latestMedia}/>}
    </div>
  </div>
  )
}
