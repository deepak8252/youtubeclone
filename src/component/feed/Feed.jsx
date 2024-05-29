import React, { useEffect, useState } from "react";
import "./Feed.css";
import { api_key, value_convertor } from "../../data";
import { Link } from "react-router-dom";

const Feed = ({ category, setCategory }) => {
  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    try {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${api_key}`);
      const result = await response.json();
      setData(result.items || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.map((item) => {
        const { id, snippet, statistics } = item;
        const { title, channelTitle, thumbnails, publishedAt } = snippet;
        const { viewCount } = statistics;
        const thumbnailUrl = thumbnails?.medium?.url || "";

        return (
          <Link to={`video/${category}/${id}`} className="card" key={id}>
            <img src={thumbnailUrl} alt={title} />
            <h2>{title}</h2>
            <h3>{channelTitle}</h3>
            <p>{`${value_convertor(viewCount)} views • ${new Date(publishedAt).toDateString()}`}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;


