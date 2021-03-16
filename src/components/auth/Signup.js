import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import { LoginModal } from "./loginModal"
import "./signup.scss"

export const SignUp = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const history = useHistory()
    const bio = useRef()
    const imgUrl = useRef()
    const username = useRef()

    const handleRegister = (e) => {
        e.preventDefault()
        if (password.current.value === verifyPassword.current.value) {
            const formdata = new FormData();
            formdata.append("image_file", imgUrl.current.files[0]);

            var requestOptions = {
              method: 'POST',
              body: formdata,
              redirect: 'follow'
            };
            return fetch("http://localhost:8000/images/profile", requestOptions
            ).then(resp => resp.json())
            .then( resp => {

                const newUser = {
                    "username": username.current.value,
                    "first_name": firstName.current.value,
                    "last_name": lastName.current.value,
                    "email": email.current.value,
                    "password": password.current.value,
                    "bio": bio.current.value,
                    "profile_image_url": resp.image_file,
                }
            return fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("valid" in res && res.valid) {
                        localStorage.setItem("user_id", res.user_id )
                        localStorage.setItem("token", res.token)
                        history.push("/")
                    }
                })
            })
        } else {
            passwordDialog.current.showModal()
        }
    }

    

    return (
        <>
        <div className="formSpace col-8 offset-2">
        <main className="m-2 p-1 pb-2">

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="mt-4" onSubmit={handleRegister}>
                <h1 className="text-center">Sign Up!</h1>
                <fieldset>
                    <div className="mt-5">
                    </div>
                    <label htmlFor="userName"> Username </label>
                    <input ref={username} type="text" name="userName" className="form-control" placeholder="Username" required autoFocus />
                </fieldset>
                <fieldset>    
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="imgUrl">Profile Image </label>
                    <input type="file" ref={imgUrl} name="imgUrl" className="form-control" placeholder="A picture of you!" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio </label>
                    <textarea ref={bio} name="bio" className="form-control" placeholder="Let others know a little bit about you..." />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-dark btn-lg mt-4" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="mt-4">
                Already registered? 
                </section>
                <section className="mb-5">
                <LoginModal color="dark" buttonLabel="Log In" />
            </section>
        </main>
        </div>
        </>
    )
}