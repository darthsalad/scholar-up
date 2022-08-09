import React from "react"
import {
 getAuth,
 createUserWithEmailAndPassword,
} from "firebase/auth"
import { useState } from "react"
import { app, auth } from "../../firebase.config"
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
 const navigate = useNavigate();
 const [mail, setMail] = useState("")
 const [password, setPassword] = useState("")
 const [cname, setCname] = useState("")
 const [domain, setDomain] = useState("")

 function handleSubmit() {
  createUserWithEmailAndPassword(
   auth,
   mail,
   password
  )
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
  //  db add details
  navigate('/')
 }

 return (
  <>
   <form>
    <h1>Register</h1>
    <p>
     Please fill in this form to register the
     details of the college.
    </p>

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
    />
    <br />

    <button
     type="submit"
     onClick={handleSubmit()}
    >
     Register
    </button>

    <div>
     <p>
      Already have an account?{" "}
      <Link to="/login">Sign in</Link>
     </p>
    </div>
   </form>
  </>
 )
}

export default Register
