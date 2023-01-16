import React from 'react'
import load from "../../assets/Bubble-Preloader-1-1-unscreen.gif"

const Loading = () => {
  return (
    <div style={{width: 250, height: 250, display: "flex", flexDirection: "column"}}>
        {/* <h1 style={theSetter}>Loading...</h1> */}
        <img src={load} alt="loader" />
    </div>
  )
}

export default Loading