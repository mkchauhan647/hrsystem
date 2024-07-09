import React, { useEffect, useState } from 'react';
import axios from 'axios'; // If using axios for API requests

const Forms = () => {
    const [formsData, setFormsData] = useState([]);

    useEffect(() => {
        // Example: Fetch forms data from an API endpoint
        axios.get('/api/forms')
            .then(response => {
                setFormsData(response.data); // Assuming API returns an array of form data
            })
            .catch(error => {
                console.error('Error fetching forms data:', error);
            });
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Submitted Forms</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg">
                    <thead>
                        <tr className="text-left bg-gray-100">
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Form ID</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">User</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Submitted At</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Analytics</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formsData.map(form => (
                            <tr key={form.id} className="border-b border-gray-200">
                                <td className="px-6 py-4 whitespace-no-wrap">{form.id}</td>
                                <td className="px-6 py-4 whitespace-no-wrap">{form.user}</td>
                                <td className="px-6 py-4 whitespace-no-wrap">{form.submittedAt}</td>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    {/* Render analytics here */}
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        View Analytics
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Forms;
