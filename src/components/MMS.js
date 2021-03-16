import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews.js"
import { NavBar } from "./navbar/NavBar.js"
import { Home } from "./home/home.js"
import { HomeAuthed, homeAuthed } from './home/homeAuthed.js'
import { EpisodeProvider } from './episode/EpisodeProvider'
import { MediaProvider } from "./media/MediaProvider.js"
import { SignUp } from './auth/Signup.js'
import { UserProvider } from "./users/UserProvider.js"
import { Users } from "./users/Users.js"
import { MediaSearch } from "./media/MediaSearch.js"



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
                <MediaProvider>
                    <MediaSearch {...props}/>
                </MediaProvider>
                </>
            } else {
                return <Redirect to="/home" />
            }
        }} />
    </>
)
