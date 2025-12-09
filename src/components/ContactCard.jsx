import React from 'react';
import { FaTwitter, FaGithub } from 'react-icons/fa';

const ContactCard = ({ twitterUrl, githubUrl }) => {
    return (
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
            <h2 className="text-3xl font-bold mb-4 text-blue-600">Contact</h2>
            <p className="mb-6 text-gray-700">
                Reach out to the developer for any inquiries:
            </p>
            <div className="flex flex-col gap-4">
                {twitterUrl && (
                    <a
                        href={twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-100 hover:bg-blue-200 rounded-xl text-blue-600 font-semibold transition"
                    >
                        <FaTwitter /> X / Twitter
                    </a>
                )}
                {githubUrl && (
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-800 font-semibold transition"
                    >
                        <FaGithub /> GitHub
                    </a>
                )}
            </div>
        </div>
    );
};

export default ContactCard;
