import React from "react"
import { useState, useEffect } from "react"
import { auth, db } from "../../firebase.config"
import { Link, useNavigate } from "react-router-dom"
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"

const Unverified = () => {
  const [user, wait] = useAuthState(auth)
  const [docId, setDocId] = useState("")
  const list = []

  // auth state takes some time
  useEffect(() => {
    console.log({ user, wait })
    user && getlist()
  }, [user])

  // get details of all unverified students in the specific in the institute
  async function getlist() {
    const q = query(
      collection(db, "students"),
      where("cdomain", "==", user.email.split("@")[1]),
      where("verified", "==", false)
    )
    const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, data: doc.data() })
    })
    console.log(list)
  }

  // verify desired student on click, setDocId when clicked
  async function verifyOnClick() {
    await updateDoc(doc(db, "students", docId), {
      verified: true,
    }).then(() => {
      console.log("Verified")
    })
  }

  return (
    <>
      <p>map the list of unverified students. see log for details</p>
    </>
  )
}

export default Unverified
