import React from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { app, auth, db } from "../../firebase.config"
import { Link, useNavigate } from "react-router-dom"
import { collection, addDoc } from "firebase/firestore"

const Register = () => {
  const navigate = useNavigate()
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const [cname, setCname] = useState("")
  const [domain, setDomain] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
        createacc()
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  async function createacc() {
    const user = auth.currentUser
    const date = new Date()
    try {
      const docRef = await addDoc(collection(db, "colleges"), {
        cname: cname,
        domain: domain,
        email: user.email,
        createdOn: date,
      })
      console.log("Document written with ID: ", docRef.id)
    } catch (e) {
      console.error("Error adding document: ", e)
    }
    navigate("/")
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <p>Please fill in this form to register the details of the college.</p>

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

        <label for="name">
          <b>College full name</b>
        </label>
        <input
          type="text"
          placeholder="complete name of the college"
          name="name"
          id="college-name"
          onChange={(e) => setCname(e.target.value)}
        />
        <br />

        <label for="domain">
          <b>college registered domain</b>
        </label>
        <input
          type="text"
          placeholder="College domain"
          name="domain"
          id="domain"
          onChange={(e) => setDomain(e.target.value)}
        />
        <br />

        <button type="submit">Register</button>

        <div>
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </form>
    </>
  )
}

export default Register
