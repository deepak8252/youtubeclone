import React, { useEffect, useState } from 'react';
import "./Recommended.css";
import { api_key, value_convertor } from '../../data';
import { Link } from 'react-router-dom';

const Recommended = ({ categoryId }) => {
    const [apidata, setApidata] = useState([]);
    const [error, setError] = useState(null);

    const fetchdata = async () => {
        const relatedVideourl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&key=${api_key}`;
        try {
            const response = await fetch(relatedVideourl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('API Response:', data);  // Log the API response for debugging
            setApidata(data.items);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchdata();
    }, [categoryId]);

    return (
        <div className='recommemded'>
            {error && <p>Error: {error}</p>}
            {apidata.length === 0 && !error && <p>Loading...</p>}
            {
                apidata.map((item) => (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={item.id}>
                        <img src={item.snippet.thumbnails.default.url} alt="thumbnail" />
                        <div className="vid-info">
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelTitle}</p>
                            <p>{`${value_convertor(item.statistics.viewCount)}`} Views</p>
                        </div>
                    </Link>
                ))
            }
        </div>
    );
};

export default Recommended;
