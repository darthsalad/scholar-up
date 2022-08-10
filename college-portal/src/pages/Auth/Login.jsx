import React from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useState, useEffect } from "react"
import { app, auth, db } from "../../firebase.config"
import { Link, useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"

const Login = () => {
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // const user = userCredential.user
        navigate("/")
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log({ errorCode, errorMessage })
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <p>Please fill in this form to log in to your college portal.</p>

        <label for="email">
          <b>Email</b>
        </label>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          id="email"
          onChange={(e) => setMail(e.target.value)}
          required
        />
        <br />

        <label for="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          id="psw"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <button type="submit">Log in</button>
        <div>
          <p>
            Make new account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </>
  )
}

export default Login
