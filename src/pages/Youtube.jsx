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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5 mt-14 sm:mt-16 md:mt-20">
            {rawData.map((feed) => (
                <div
                    key={feed._id}
                    className="border border-gray-200 rounded-xl p-4 bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                    <iframe
                        width="100%"
                        height="220"
                        src={getEmbedLink(feed.link)}
                        allowFullScreen
                        className="rounded-lg"
                    ></iframe>

                    <h2 className="text-[17px] font-semibold text-gray-800 mt-3 leading-snug">
                        {feed.title}
                    </h2>

                    {feed.category && (
                        <p className="text-sm font-medium text-gray-600 mt-1">
                            Category: {feed.category.join(', ')}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Youtube;
