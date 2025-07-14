import React from 'react'
import { useSelector } from 'react-redux'
import { Poast } from './Poast'
const Poasts = () => {
const posts = useSelector((state)=> state.posts)
console.log(posts)

  return (
    <div>
    <Poast/>
  
    </div>

  )
}

export default Poasts