import React from 'react'
import "./Drop.css"
import {Link} from "react-router-dom";


const Drop = ({cats, handleDrop, remove}) => {
    
  return (
    <div className="Drop" onMouseOver={handleDrop} onMouseLeave={remove}>
        {
            cats.map((i, index)=>(
                <Link key={index} className="Link" to={`/category/${i}`}>
                <p>{i}</p>
                </Link>
            ))
        }
    </div>
  )
}

export default Drop