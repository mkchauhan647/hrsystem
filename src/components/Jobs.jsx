'use client'

// JobDashboard.js

import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { useRouter } from 'next/navigation';
import {dummyJobs} from '@/data/dummyJobs';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            // Dummy job data for demonstration
            

            // Simulating API fetch with dummy data
            setJobs(dummyJobs);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const handleApplyJob = async (jobId) => {
        try {
            // Implement job application logic here
            console.log('Applying for job with ID:', jobId);

            router.push(`/apply/${jobId}`); // Redirect to job application page


        } catch (error) {
            console.error('Error applying for job:', error);
        }
    };

    return (
        <div className="job-dashboard min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold leading-tight text-center mb-8">Job Dashboard</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {jobs.map(job => (
                        <div key={job._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="px-6 py-4">
                                <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                                <p className="text-gray-700 mb-4">{job.description}</p>
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => handleApplyJob(job._id)}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
