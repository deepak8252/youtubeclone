import React, { useEffect, useState } from 'react';
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import user_profile from "../../assets/user_profile.jpg";
import "./Playvideo.css";
import { api_key, value_convertor } from '../../data';
import { useParams } from 'react-router-dom';

const Playvideo = () => {
  const {videoId}=useParams()
  const [apidata, setApidata] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchVideoData = async () => {
    try {
      
      const videodetailsurl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${api_key}`;
      const response = await fetch(videodetailsurl);
      const data = await response.json();
      setApidata(data.items[0]);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  const fetchChannelAndCommentData = async (channelId) => {
    try {
      const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${api_key}`;
      const channelResponse = await fetch(channelDataUrl);
      const channelData = await channelResponse.json();
      setChannelData(channelData.items[0]);

      const commentDataUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${api_key}`;
      const commentResponse = await fetch(commentDataUrl);
      const commentData = await commentResponse.json();
      setComments(commentData.items);
    } catch (error) {
      console.error("Error fetching channel and comment data:", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (apidata) {
      fetchChannelAndCommentData(apidata.snippet.channelId);
    }
  }, [apidata]);

  return (
    <div className='play-video'>
      <iframe 
        src={`https://www.youtube.com/embed/${videoId}?si=UO7lpz7ChBLsygv1`} 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen 
        title={apidata ? apidata.snippet.title : "Video"}
      ></iframe>
      <h3>{apidata ? apidata.snippet.title : "Title here"}</h3>
      <div className="playvideo-info">
        <p>{apidata ? `${value_convertor(apidata.statistics.viewCount)} views • ${new Date(apidata.snippet.publishedAt).toDateString()}` : "Loading..."}</p>
        <div>
          <span><img src={like} alt="like" />{apidata ? value_convertor(apidata.statistics.likeCount) : "Loading..."}</span>
          <span><img src={dislike} alt="dislike" />{apidata ? value_convertor(apidata.statistics.dislikeCount) : "Loading..."}</span>
          <span><img src={share} alt="share" />share</span>
          <span><img src={save} alt="save" />save</span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="channel" />
        <div>
          <p>{apidata ? apidata.snippet.channelTitle : "Channel"}</p>
          <span>{channelData ? `${value_convertor(channelData.statistics.subscriberCount)} subscribers` : "Loading..."}</span>
        </div>
        <button>subscribe</button>
      </div>
      <div className="vid-descri">
        <p>{apidata ? apidata.snippet.description.slice(0, 250) : "Loading description..."}</p>
        <p>Subscribe to {apidata ? apidata.snippet.channelTitle : "this channel"} to watch more tutorials on web development.</p>
        <hr />
        <h4>{apidata ? `${value_convertor(apidata.statistics.commentCount)} Comments` : "Loading comments..."}</h4>
        {comments.length > 0 ? comments.map((item, index) => (
          <div className="comment" key={index}>
            <img src={user_profile} alt="user profile" />
            <div>
              <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{new Date(item.snippet.topLevelComment.snippet.publishedAt).toDateString()}</span></h3>
              <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
              <div className="comment-action">
                <img src={like} alt="like" />
                <span>{value_convertor(item.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislike} alt="dislike" />
                <span></span>
              </div>
            </div>
          </div>
        )) : <p>Loading comments...</p>}
      </div>
    </div>
  );
};

export default Playvideo;
