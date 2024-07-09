import React, { useEffect, useState } from 'react';
import axios from 'axios'; // If using axios for API requests
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
// import { IoEye } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import LoadingBubble from './Loading'
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


    if (!formsData.length) {
        return <LoadingBubble />;
    }



    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Submitted Forms</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg">
                    <thead>
                        <tr className="text-left bg-gray-100">
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Job ID</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Submitted At</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Resume</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Edit</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formsData.map(form => (
                            <tr key={form.id} className="border-b border-gray-200">
                                <td className="px-6 py-4 whitespace-no-wrap">{form.name}</td>
                                <td className="px-6 py-4 whitespace-no-wrap">{form.email}</td>
                                <td className="px-6 py-4 whitespace-no-wrap">{form.jobId}</td>
                                <td className="px-6 py-4 whitespace-no-wrap">{form.submit_date}</td>
                                <td className="px-6 py-4 whitespace-no-wrap">{form.status}</td>
                                <td className="px-6 py-4 whitespace-no-wrap cursor-pointer"><IoEyeOutline className='text-blue-s400 text-lg '/></td>
                                <td className="px-6 py-4 whitespace-no-wrap cursor-pointer"><FaRegEdit className=''/></td>
                                <td className="px-6 py-4 whitespace-no-wrap cursor-pointer"><MdOutlineDeleteForever className=' text-2xl text-red-500'/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Forms;
