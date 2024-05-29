import React from 'react'
import "./Video.css"
import Playvideo from '../../component/playvideo/Playvideo'
import Recommended from '../../component/recomended/Recommended';
import { useParams } from 'react-router-dom';

const Video = () => {
  const {videoId,categoryId}=useParams()
  return (
    <div className="play-container">
      <Playvideo videoId={videoId}/>
      <Recommended categoryId={categoryId}/>

    </div>
  )
}

export default Video

