// CandidateForm.js
'use client'
import React, { useState } from 'react';
import api from '@/services/api';
import validators from '@/utils/validators';
import { dummyJobs } from '@/data/dummyJobs';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const CandidateForm = ({ params }) => {
    
    console.log(params);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        skills: '',
        status: 'pending',
        submit_date: new Date().toLocaleDateString(),
        resume: null,
        coverLetter: null,
        otherFiles: []
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'resume' || name === 'coverLetter') {
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        } else if (name === 'otherFiles') {
            setFormData(prevState => ({
                ...prevState,
                otherFiles: [...prevState.otherFiles, ...files]
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform form validation
        if (!validators.validateCandidateForm(formData)) {
            // Handle validation errors
            console.log('Validation failed');
            return;
        }
        // Prepare form data for submission
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('education', formData.education);
        formDataToSend.append('experience', formData.experience);
        formDataToSend.append('skills', formData.skills);
        formDataToSend.append('resume', formData.resume);
        formDataToSend.append('coverLetter', formData.coverLetter);
        formData.otherFiles.forEach(file => {
            formDataToSend.append('otherFiles', file);
        });
        formDataToSend.append('jobId', params.jobid);
        formDataToSend.append('status', formData.status);

        // Submit data to backend
        try {
            const response = await api.addCandidate(formDataToSend);
            // console.log('Candidate submitted successfully!', response.data);
            if (response.status === 200) {
                toast.success('Applicatoin submitted successfully!');
            }
            // toast.success('Candidate submitted successfully!');
            // Optionally, reset form fields after successful submission
            // setFormData({
            //     name: '',
            //     email: '',
            //     phone: '',
            //     education: '',
            //     experience: '',
            //     skills: '',
            //     resume: null,
            //     coverLetter: null,
            //     otherFiles: []
            // });
        } catch (error) {
            console.error('Error submitting candidate:', error);
            // Handle error state
            
            toast.error(`Error ! ${error.response.data.message}`);
        }
    };

    return (
        <div className=" w-[60%] mx-auto p-6 bg-white shadow-md rounded-md m-6 w">


            <div className='py-8'>
                <p>You are Apply For this Job Application:</p>
                {
                    dummyJobs.map((job, index) => {
                        if (job._id == params.jobid) {
                            return (
                                <ul key={index} className=' list-disc list-inside p-4'>
                                    <li className="text-lg font-semibold">{job.title}</li>
                                    <li>{job.description}</li>
                                    <li>{job.company}</li>
                                </ul>
                            );
                        }
                    
                    })
                }
            </div>



            {/* <h2 className="text-lg font-semibold mb-4">App</h2> */}
            <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <div className="mb-4">
                <div className='flex gap'>
                    <label className="block mb-1">Name</label>
                    <span className="material-icons text-lg text-blue-500">human</span>
                   </div>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border-2 rounded text-gray-700" required />
                </div>
                <div className="mb-4">
                    <div className='flex gap-2'>
                    <label className="block mb-1">Email</label>
                    <span className="material-icons text-lg text-blue-500">mail</span>
                   </div>

                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border-2 rounded text-gray-700" required />
                </div>
                <div className="mb-4">
                    <div className='flex gap-2'>
                    {/* <label className="block mb-1">Email</label> */}
                    <label className="block mb-1">Phone</label>
                    <span className="material-icons text-lg text-blue-500">phone</span>
                   </div>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border-2 rounded text-gray-700" required />
                </div>

                {/* Education */}
                <div className="mb-4">
                    <div className='flex gap-2'>
                    {/* <label className="block mb-1">Email</label> */}
                    <label className="block mb-1">Education</label>
                    <span className="material-icons text-lg text-blue-500">school</span>
                   </div>
                    <textarea name="education" value={formData.education} onChange={handleChange} className="w-full px-3 py-2 border-2 rounded text-gray-700" rows="3"></textarea>
                </div>

                {/* Work Experience */}
                <div className="mb-4">
                    <div className='flex gap-2'>
                    {/* <label className="block mb-1">Email</label> */}
                    <label className="block mb-1">Work Experience</label>
                    <span className="material-icons text-lg text-blue-500">work</span>
                   </div>
                    <textarea name="experience" value={formData.experience} onChange={handleChange} className="w-full px-3 py-2 border-2 rounded text-gray-700" rows="3"></textarea>
                </div>

                {/* Skills */}
                <div className="mb-4">
                    <div className='flex gap-2'>
                    <label className="block mb-1">Skills</label>
                    {/* <label className="block mb-1">Email</label> */}
                    <span className="material-icons text-lg text-blue-500">lightbulb</span>
                   </div>
                    <textarea name="skills" value={formData.skills} onChange={handleChange} className="w-full px-3 py-2 border-2 rounded text-gray-700" rows="3"></textarea>
                </div>

              

                    {/* File Uploads */}
                <div className="mb-4 flex items-center">
                    <label className="block mb-1 mr-2">Resume (PDF/Word)</label>
                    <span className="material-icons text-lg text-blue-500">description</span>
                    <input type="file" name="resume" onChange={handleChange} accept=".pdf,.doc,.docx" className="file-upload ml-2" />
                </div>
                <div className="mb-4 flex items-center">
                    <label className="block mb-1 mr-2">Cover Letter (PDF/Word)</label>
                    <span className="material-icons text-lg text-green-500">mail</span>
                    <input type="file" name="coverLetter" onChange={handleChange} accept=".pdf,.doc,.docx" className="file-upload ml-2" />
                </div>
                <div className="mb-4 flex items-center">
                    <label className="block mb-1 mr-2">Other Files (PDF/Word)</label>
                    <span className="material-icons text-lg text-red-500">folder</span>
                    <input type="file" name="otherFiles" onChange={handleChange} accept=".pdf,.doc,.docx" multiple className="file-upload ml-2" />
                </div>



                {/* Submit Button */}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CandidateForm;
