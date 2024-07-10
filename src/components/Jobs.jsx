'use client'

// JobDashboard.js

import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
// import { jobsData } from '@/data/dummyJobs';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            // Dummy job data for demonstration

            const response = await axios.get('/api/jobs',)

            const jobData = await response.data;
            

            // Simulating API fetch with dummy data
            console.log('jobdata', jobData.data[0]);

            jobData.data.sort((a, b) => {
                if (a.updatedAt._seconds === b.updatedAt._seconds) {
                  return b.updatedAt._nanoseconds - a.updatedAt._nanoseconds;
                } else {
                  return b.updatedAt._seconds - a.updatedAt._seconds;
                }
              });
              
              
           
            setJobs(jobData.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const checkData = () => {
        jobs[0].requirements.map((value) => {
            console.log(value);
        })
    }

    const handleApplyJob = async (jobId) => {
        try {
            // Implement job application logic here
            console.log('Applying for job with ID:', jobId);

            router.push(`/apply/${jobId}`); // Redirect to job application page


        } catch (error) {
            console.error('Error applying for job:', error);
        }
    };

    const handleDeleteJob = (jobid) => {
  
        console.log(`JOb with ${jobid} is being deleted`);
        toast.success(`Job With id ${jobid} is being deleted !`)
    }

    const getRequirements = (requirements) => {
        const arrayReq = requirements;
        if (requirements) {
            return requirements.map((value,index) => {
                return <li key={index}>{value}</li>
            })
        }
        else {
            return null;
        }
    }

    return (
        <div className="job-dashboard min-h-screen bg-gradient-to-b bg-white  py-12 px-4 sm:px-6 lg:px-8 overflow-auto">

            <div className="max-w-7xl mx-auto pb-12 ">
                <h2 className="text-3xl font-extrabold leading-tight text-center mb-8 text-blue-400">Job Dashboard</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {jobs && jobs.map(job => (
                        <div key={job.id} className="bg-white shadow-md rounded-lg flex flex-col justify-between overflow-hidden hover:scale-105 transition-all duration-500">
                            <div className="px-6 py-4">
                                <h3 className="text-lg font-semibold mb-2 text-blue-400">{job.title}</h3>
                                <h3 className="text-lg font-semibold mb-2 text-blue-400">Company: {job.companyName}</h3>
                                <p className="text-gray-700 mb-4">{job.jobDescription}</p>
                                {/* <p className="text-gray-700 mb-4">{job.requirements}</p> */}
                                <ul className="text-gray-700 mb-4 list-disc list-inside ">
                                    {
                                       getRequirements(job.requirements)
                                   }
                                </ul>

                               
                            </div>
                            <div className='pb-4 pl-4 space-x-12 space-y-4'>
                            <button
                                    className="bg-blue-400 w-24  hover:bg-blue-600 transition-all duration-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => handleApplyJob(job.id)}
                                >
                                    Apply
                                </button>
                            <button
                                    className="bg-red-400 w-24  hover:bg-red-600 transition-all duration-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => handleDeleteJob(job.id)}
                                >
                                    Delete
                                </button>
                                </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Jobs;
