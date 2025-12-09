import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Youtube = () => {
    const [rawData, setRawData] = useState([]);

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const response = await axios.post(
                    "https://feedika-backend.onrender.com/api/youtube",
                    {},
                    { withCredentials: true }
                );

                const sortedData = response.data
                    .sort((a, b) => new Date(b.createdAt || b._id.getTimestamp()) - new Date(a.createdAt || a._id.getTimestamp()));
                setRawData(sortedData);
            } catch (err) {
                console.error(err);
            }
        };

        dataFetch();
    }, []);

    const getEmbedLink = (url) => {
        let videoId = "";

        if (url.includes("youtu.be/")) {
            videoId = url.split("youtu.be/")[1].split("?")[0];
        } else if (url.includes("youtube.com/watch")) {
            const params = new URLSearchParams(url.split("?")[1]);
            videoId = params.get("v");
        }

        return `https://www.youtube.com/embed/${videoId}`;
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', padding: '20px' }}>
            {rawData.map((feed) => (
                <div
                    key={feed._id}
                    style={{
                        border: '1px solid #eee',
                        borderRadius: '12px',
                        padding: '15px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        backgroundColor: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start'
                    }}
                >
                    <iframe
                        width="100%"
                        height="220"
                        src={getEmbedLink(feed.link)}
                        allowFullScreen
                        style={{ borderRadius: '10px' }}
                    ></iframe>
                    <h2 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#222',
                        marginTop: '12px',
                        lineHeight: '1.3'
                    }}>
                        {feed.title}
                    </h2>
                    {feed.category && (
                        <p style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#555',
                            marginTop: '6px'
                        }}>
                            Category: {feed.category.join(', ')}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Youtube;
