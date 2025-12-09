import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const Tiktok = () => {
    const [rawData, setRawData] = useState([]);
    const [muted, setMuted] = useState(true);
    const iframeRefs = useRef([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "https://feedika-backend.onrender.com/api/tiktok",
                    {},
                    { withCredentials: true }
                );

                const sortedData = (response.data || []).sort(
                    (a, b) => new Date(b.createdAt || b._id?.getTimestamp?.()) - new Date(a.createdAt || a._id?.getTimestamp?.())
                );

                setRawData(sortedData);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const iframe = entry.target;

                    if (entry.isIntersecting) {
                        iframe.setAttribute(
                            "src",
                            iframe.dataset.src + `?autoplay=1&muted=${muted ? 1 : 0}`
                        );
                    } else {
                        iframe.setAttribute("src", iframe.dataset.src);
                    }
                });
            },
            { threshold: 0.75 }
        );

        iframeRefs.current.forEach(el => el && observer.observe(el));
        return () => observer.disconnect();
    }, [rawData, muted]);

    const getEmbedLink = (url) => {
        if (!url) return '';
        const videoId = url.split('/video/')[1];
        return `https://www.tiktok.com/embed/v2/${videoId}`;
    };

    return (
        <div style={{ height: '100vh', overflowY: 'scroll', scrollSnapType: 'y mandatory' }}>
            {rawData.map((feed, index) => (
                <div
                    key={feed._id}
                    style={{
                        height: '100vh',
                        scrollSnapAlign: 'start',
                        backgroundColor: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}
                >
                    <iframe
                        ref={el => iframeRefs.current[index] = el}
                        data-src={getEmbedLink(feed.link)}
                        src={getEmbedLink(feed.link)}
                        width="360"
                        height="640"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        style={{ border: 'none', borderRadius: '12px' }}
                    ></iframe>

                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        zIndex: 10
                    }}>
                        <button
                            onClick={() => setMuted(!muted)}
                            style={{
                                background: 'rgba(0,0,0,0.5)',
                                color: '#fff',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            {muted ? 'Unmute' : 'Mute'}
                        </button>
                    </div>

                    <div style={{
                        position: 'absolute',
                        bottom: '40px',
                        left: '20px',
                        color: '#fff',
                        maxWidth: '70%'
                    }}>
                        <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>
                            {feed.title}
                        </h2>
                        {feed.category && (
                            <p style={{ fontSize: '14px', opacity: 0.8 }}>
                                #{feed.category.join('  #')}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Tiktok;
