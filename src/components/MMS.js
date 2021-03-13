import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews.js"
import { NavBar } from "./navbar/NavBar.js"
import { Home } from "./home/home.js"
import { homeAuthed } from './home/homeAuthed.js'
import { EpisodeProvider } from './episode/EpisodeProvider'
import { MediaProvider } from "./media/MediaProvider.js"
import { SignUp } from './auth/Signup.js'



export const MMS = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <NavBar />
                    <ApplicationViews />
                </>
            } else {
                return <Redirect to="/home" />
            }
        }} />

        <Route path="/home" render={() => {
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

    </>
)
