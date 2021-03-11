import React, { useContext, useEffect, useState } from 'react'
import { EpisodeEmbed } from '../episode/episodeEmbed.js'
import { EpisodeContext } from '../episode/EpisodeProvider.js'

export const Home = () => {
  const {latest, getLatest, getLatestEpisode } = useContext(EpisodeContext)
    
  useEffect(() => {
    console.log(latest)
    getLatestEpisode()
      },[])

  return(<>
    <h1>Un-Authed Home Page</h1>
    {latest && <EpisodeEmbed episode={latest}/>}
  </>
  )
}
