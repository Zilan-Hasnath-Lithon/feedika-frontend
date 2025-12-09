import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Facebook = () => {
    const [rawData, setRawData] = useState([]);

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const response = await axios.post(
                    "https://feedika-backend.onrender.com/api/facebook",
                    {},
                    { withCredentials: true }
                );

                const sortedData = (response.data || []).sort((a, b) => {
                    const da = new Date(a.createdAt || a._id?.getTimestamp?.() || 0);
                    const db = new Date(b.createdAt || b._id?.getTimestamp?.() || 0);
                    return db - da;
                });

                setRawData(sortedData);
            } catch (err) {
                console.error(err);
            }
        };

        dataFetch();
    }, []);

    const getEmbedLink = (url) => {
        if (!url) return "";
        const cleanUrl = url.split("?")[0];
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
            cleanUrl
        )}&show_text=false&width=560`;
    };

    return (
        <div className="flex flex-col items-center gap-6 p-5 bg-gray-50 min-h-screen">
            {rawData.map((feed) => (
                <div
                    key={feed._id}
                    className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl p-5 shadow-lg flex flex-col gap-4 hover:shadow-2xl transition-shadow"
                >
                    <div className="relative w-full pt-[56.25%] overflow-hidden rounded-xl bg-black">
                        <iframe
                            title={feed._id}
                            src={getEmbedLink(feed.link)}
                            className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                        {feed.title || "Untitled"}
                    </h3>

                    {Array.isArray(feed.category) && (
                        <p className="text-sm text-gray-600">
                            Category: {feed.category.join(", ")}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Facebook;
