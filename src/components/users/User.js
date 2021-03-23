import React, { useContext, useEffect } from 'react'
import { WatchContext } from '../status/WatchProvider'
import { TopListContext } from '../toplist/ToplistProvider'
import { UserContext } from './UserProvider'
import { Link } from 'react-router-dom'
import { UserWatched } from './UserWatched'


export const User = (props) => {
    const {user, getUser} = useContext(UserContext)
    const {userList, getUserLists} = useContext(TopListContext)
    const {} = useContext(WatchContext)

    useEffect(()=> {
        getUserLists(props.match.params.userId)
        getUser(props.match.params.userId)
    }, [])

    return (
        <div className="user-profile d-flex">
        <div className="left-panel col-6">
        <div className="user-section userbox d-flex"></div>
        {user && <> 
                                                <div className="userbox d-flex col-lg-8 m-5">
                                                    <img className="user-pic rounded-circle m-4" src={user.profile_image_url} />
                                                    <div className="m-3 user-details"><p><h3 style={{ display: 'inline' }}>Username:</h3> <h1 style={{ display: 'inline' }}>{user.user_id && user.user_id.username}</h1></p>
                                                    <p style={{ marginTop:'2rem' }}><h3 >Name: {user.user_id && user.user_id.first_name} {user.user_id && user.user_id.last_name} </h3></p>
                                                    <p style={{ marginTop:'2rem' }} ><h4>Email: {user.user_id && user.user_id.email} </h4></p>
                                                    <p style={{ marginTop:'2rem'}}><h6>Bio:</h6> <h5>{user.bio}</h5></p>
                                                    </div>
                                                </div> 

        </>}
        <div className="watched-section mt-5"></div>
        <UserWatched userId={props.match.params.userId} />
        </div>
        <div className="right-panel col-5">
        <div className="toplists-section p-5">
            {userList.count > 0 ? userList.results.map(list => 
                <Link to={`/toplist/${list.id}`} style={{ textDecoration: 'none', color:'black' }}> <div className="m-2 p-2 text-center list-group">
                <h3>{list.title}</h3>
                <h6>Created By: {list.user_id.user_id.username}</h6>
                <h6>{list.toplist_items.length} Items</h6>
                </div>
                </Link>) :
                <div className="list-group"><h2 className="text-center">This User Has No Lists</h2></div>
                }
        </div>
        </div>
        </div>


    )
}