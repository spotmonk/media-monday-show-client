import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews.js"
import { NavBar } from "./navbar/NavBar.js"
import { Home } from "./home/home.js"
import { homeAuthed } from './home/homeAuthed.js'



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
           return (<>
            <Home />
           </>
           )
        }} />

    </>
)