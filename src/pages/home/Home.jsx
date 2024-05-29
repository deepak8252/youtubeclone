import React, { useState } from 'react'
import "./home.css"
import Video from '../video/Video'
import Sidebar from '../../component/sidebar/Sidebar';
import Feed from '../../component/feed/Feed';

const Home = ({sidebar}) => {
  const [category,setCategory]=useState(0)
  return (
    <>
    <Sidebar sidebar={sidebar} category={category} setCategory={setCategory}/>
    <div className={`container ${sidebar?"":"large-container"}`}>
<Feed category={category} setCategory={setCategory}/>
    </div>
    </>
  )
}

export default Home