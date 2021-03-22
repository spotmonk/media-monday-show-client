import userEvent from '@testing-library/user-event'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserProvider'
import './users.scss'

export const Users = () => {
    const { users, getAllUsers } = useContext(UserContext)

    useEffect(() => {
        getAllUsers()
          },[])

    return (
        <div className="allusers  flex">
        {users.count > 0 && users.results.map(user => <Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }} >
                                                <div className="userbox d-flex col-lg-8 m-5">
                                                    <img className="user-pic rounded-circle m-4" src={user.profile_image_url} />
                                                    <div className="m-3 user-details"><p><h2 style={{ display: 'inline' }}>Username:</h2> <h1 style={{ display: 'inline' }}>{user.user_id && user.user_id.username}</h1></p>
                                                    <p><h3 style={{ display: 'inline' }}>Name:</h3><h2 style={{ display: 'inline' }}> {user.user_id && user.user_id.first_name}</h2></p>
                                                    <p><h6>Bio:</h6> <h5>{user.bio}</h5></p>
                                                    </div>
                                                </div> 
                                            </Link> )}
        </div>
    )
}
