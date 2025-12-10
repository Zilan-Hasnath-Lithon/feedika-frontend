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

                const sortedData = (response.data || []).sort(
                    (a, b) =>
                        new Date(b.createdAt || b._id?.getTimestamp?.()) -
                        new Date(a.createdAt || a._id?.getTimestamp?.())
                );
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
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rawData.map((feed) => (
                <div
                    key={feed._id}
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-md flex flex-col gap-3"
                >
                    <div className="relative w-full pt-[56.25%] overflow-hidden rounded-lg bg-black">
                        <iframe
                            title={feed._id}
                            src={getEmbedLink(feed.link)}
                            className="absolute top-0 left-0 w-full h-full border-0"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>

                    <h3 className="text-base font-semibold text-gray-900 leading-tight">
                        {feed.title || 'Untitled'}
                    </h3>

                    {Array.isArray(feed.category) && (
                        <p className="text-sm text-gray-600">
                            Category: {feed.category.join(', ')}
                        </p>
                    )}

                    <p className="text-xs text-gray-500">YouTube</p>
                </div>
            ))}
        </div>
    );
};

export default Youtube;
