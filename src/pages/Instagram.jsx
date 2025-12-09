import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Instagram = () => {
    const [rawData, setRawData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "https://feedika-backend.onrender.com/api/instagram",
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

    const getEmbedLink = (url) => url || '';

    return (
        <div className="flex flex-col items-center gap-6 p-5">
            <h1 className='text-3xl mb-6'>We are working on this...</h1>
            {rawData.map((feed) => (
                <div
                    key={feed._id}
                    className="w-full max-w-xl bg-white border border-gray-200 rounded-xl p-4 shadow-md flex flex-col gap-3"
                >
                    <div className="relative w-full pt-[100%] overflow-hidden rounded-lg bg-black">
                        <iframe
                            title={feed._id}
                            src={getEmbedLink(feed.link)}
                            className="absolute top-0 left-0 w-full h-full border-0"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>

                    <h3 className="text-base font-semibold text-gray-900 leading-tight">
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

export default Instagram;
