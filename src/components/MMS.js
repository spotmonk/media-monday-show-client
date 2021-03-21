import React from "react"
import { Route, Redirect } from "react-router-dom"
import { NavBar } from "./navbar/NavBar.js"
import { Home } from "./home/home.js"
import { HomeAuthed} from './home/homeAuthed.js'
import { EpisodeProvider } from './episode/EpisodeProvider'
import { MediaProvider } from "./media/MediaProvider.js"
import { SignUp } from './auth/Signup.js'
import { UserProvider } from "./users/UserProvider.js"
import { Users } from "./users/Users.js"
import { MediaSearch } from "./media/MediaSearch.js"
import { WatchProvider } from "./status/WatchProvider.js"
import { SingleMedia } from "./media/SingleMedia.js"
import { ReviewProvider } from "./reviews/ReviewProvider.js"
import { ToWatch } from "./towatch/ToWatch.js"
import { Watched } from "./watched/Watched.js"
import { Rankings } from "./rankings/Rankings.js"
import { RankingProvider } from './rankings/RankingProvider'
import { TopListProvider } from "./toplist/ToplistProvider.js"



export const MMS = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <NavBar />
                </>
            }       
        }} />

        <Route exact path="/home" render={() => {
            if (localStorage.getItem("token")) {
                return <Redirect to="/" />
            } else {
           return (<>
           <NavBar />
            <EpisodeProvider>
                <MediaProvider>
                    <Home />
                </MediaProvider>
            </EpisodeProvider>
            
           </>
           )}
        }} />

        <Route path="/signup" render={() => {
            if (localStorage.getItem("token")) {
                return <Redirect to="/" />
            } else {
           return (<>
           <NavBar />
                <SignUp />
            
           </>
           )}
        }} />

        <Route exact path="/" render={(props) => {
            if (localStorage.getItem("token")) {
                return <>
                    <EpisodeProvider>
                        <MediaProvider>
                            <HomeAuthed {...props} />
                        </MediaProvider>
                    </EpisodeProvider>
                </>
            } else {
                return <Redirect to="/home" />
            }
        }} />

        <Route path="/episode/:episodeId" render={(props) => {
            if (localStorage.getItem("token")) {
                return <>
                    <EpisodeProvider>
                        <MediaProvider>
                            <HomeAuthed {...props} />
                        </MediaProvider>
                    </EpisodeProvider>
                </>
            } else {
                return <Redirect to="/home" />
            }
        }} />

        <Route exact path="/users" render={(props) => {
            if (localStorage.getItem("token")) {
                return <>
                  <UserProvider>
                    <Users {...props} />
                 </UserProvider>
                </>
            } else {
                return <Redirect to="/home" />
            }
        }} />

        <Route exact path="/mediasearch" render={(props) => {
            if (localStorage.getItem("token")) {
                return <>
                <WatchProvider>
                <MediaProvider>
                    <MediaSearch {...props}/>
                </MediaProvider>
                </WatchProvider>
                </>
            } else {
                return <Redirect to="/home" />
            }
        }} />

        <Route path="/media/:mediaId" render={(props) => {
            if (localStorage.getItem("token")) {
                return <>
                <WatchProvider>
                <MediaProvider>
                <ReviewProvider>
                    <SingleMedia {...props}/>
                </ReviewProvider>
                </MediaProvider>
                </WatchProvider>
                </>
            } else {
                return <Redirect to="/home" />
            }
        }} />
        <Route exact path="/towatch" render={(props) => {
            if (localStorage.getItem("token")) {
                return <>
                <WatchProvider>
                    <ToWatch {...props}/>
                </WatchProvider>
                </>
            } else {
                return <Redirect to="/home" />
            }
        }} />

        <Route exact path="/watched" render={(props) => {
            if (localStorage.getItem("token")) {
                return <>
                <WatchProvider>
                    <Watched {...props}/>
                </WatchProvider>
                </>
            } else {
                return <Redirect to="/home" />
            }
        }} />

        
        <Route exact path="/rankings" render={(props) => {
            if (localStorage.getItem("token")) {
                return <>
                <TopListProvider>
                <RankingProvider>
                    <Rankings {...props}/>
                </RankingProvider>
                </TopListProvider>
                </>
            } else {
                return <Redirect to="/home" />
            }
        }} />
    </>
)
