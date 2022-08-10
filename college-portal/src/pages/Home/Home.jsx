import React from "react"
import Navbar from "../../components/Navbar/Navbar"
import { StatsGroup } from "../../components/Stats/Stats"
import { auth } from "../../firebase.config"
import { useAuthState } from "react-firebase-hooks/auth"

const Home = () => {
  const [user, loading] = useAuthState(auth)
  return (
    <div>
      {console.log(user)}
      <Navbar></Navbar>
      <StatsGroup></StatsGroup>
    </div>
  )
}

export default Home
