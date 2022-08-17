import { TextInput, Button, Text } from "@mantine/core"
import { TimeInput } from "@mantine/dates"
import { IconAt, IconBuilding } from "@tabler/icons"
import React from "react"
import Navbar from "../../components/Navbar/Navbar"
import Error from "../../components/Error/Error"
import Load from "../../components/Load/Load"
import { useStyles } from "./Profile.styles"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../../firebase.config"
import { useEffect, useState } from "react"
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore"

const Profile = () => {
  const [user, wait] = useAuthState(auth)
  const [cname, setCname] = useState("")
  const [domain, setDomain] = useState("")
  const [docid, setDocId] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [begin, setBegin] = useState("")
  const [end, setEnd] = useState("")
  const { classes } = useStyles()

  useEffect(() => {
    console.log({ user, wait })
    user && getDetails()
  }, [user])

  async function getDetails() {
    try {
      const q = query(collection(db, "colleges"), where("email", "==", user.email))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        setDocId(doc.id)
        setCname(doc.data().cname)
        setDomain(doc.data().domain)
      })
      setLoading(false)
      // throw new Error("Eww");
    } catch (err) {
      setError(err)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await updateDoc(doc(db, "colleges", docid), {
        cname: cname,
        class_begin: begin,
        class_end: end
      })
      console.log("Details updated")
      // throw new Error("Eww");
    } catch (err) {
      setError(err)
    }
  }

  if (loading) return <Load></Load>

  if (!loading && error) return <Error></Error>

  return (
    <div>
      <Navbar></Navbar>

      <div className={classes.root}>
        <Text className={classes.text}>Edit Profile</Text>
        <div className={classes.form}>
          <form>
            <div className={classes.content}>
              <TextInput
                icon={<IconBuilding size={14}></IconBuilding>}
                label="Institute name"
                value={cname}
                placeholder="Update name of the college"
                className={classes.textInput}
                onChange={(e) => setCname(e.target.value)}
                required
              ></TextInput>
              <TextInput
                icon={<IconAt size={14}></IconAt>}
                label="Institute domain"
                placeholder="Update your institute's domain"
                value={domain}
                className={classes.textInput}
                disabled={true}
              ></TextInput>
              <div className={classes.timeInputs}>
                <TimeInput label="Begin classes (24 hr format)" clearable required className={classes.timeInput}
                onChange={(e)=>{setBegin(e.toLocaleTimeString())}}
                ></TimeInput>
                <TimeInput label="End classes (24 hr format)" clearable required className={classes.timeInput}
                onChange={(e)=>{setEnd(e.toLocaleTimeString())}}
                ></TimeInput>
              </div>

              <Button type="submit" onClick={(e)=>handleSubmit(e)} fullWidth>
                Save changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
