import { useState } from 'react';
export default function Dashboard() {
    const [candidates, setCandidates] = useState([]);
    const [resumes, setResumes] = useState([]);



    // Function to parse resume
  const parseResume = async (file) => {
    try {
      const formData = new FormData();
      formData.append('resume', file);
      const response = await axios.post('/api/parse-resume', formData);
      const parsedResume = response.data;
      setResumes([...resumes, parsedResume]);
    } catch (error) {
      console.error('Error parsing resume:', error);
    }
  };

// Function to fetch candidates
  const fetchCandidates = async () => {
    try {
      const response = await axios.get('/api/candidates');
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
    };
    

    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container px-6 py-8 mx-auto">
                <h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>

                <div className="mt-4">
                    <div className="flex flex-wrap -mx-6">
                        <div className="w-full px-6 xl:w-1/2">
                            <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                                <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                                    <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 11V3.055A9.001 9.001 0 0120.945 13H11z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                                    </svg>
                                </div>
                                <div className="mx-5">
                                    <h4 className="text-2xl font-semibold text-gray-700">0</h4>
                                    <div className="text-gray-500">Total Candidates</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full px-6 mt-6 xl:w-1/2 xl:mt-0">
                            <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                                <div className="p-3 bg-blue-600 bg-opacity-75 rounded-full">
                                    <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 20l-6-6m0 0l-6-6m6 6h12m0 0l-6-6m6 6L6 6m6 6L6 6"></path>
                                    </svg>
                                </div>
                                <div className="mx-5">
                                    <h4 className="text-2xl font-semibold text-gray-700">0</h4>
                                    <div className="text-gray-500">Parsed Resumes</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h4 className="text-gray-600">Resume Upload</h4>
                    <div className="mt-4">
                        <input type="file" onChange={(e) => parseResume(e.target.files[0])} />
                    </div>
                </div>

                <div className="mt-8">
                    <h4 className="text-gray-600">Candidates</h4>
                    <button onClick={fetchCandidates} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">Fetch Candidates</button>
                    <div className="mt-4">
                        {candidates.map((candidate, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm">
                                <div>
                                    <h5 className="text-lg font-semibold text-gray-700">{candidate.name}</h5>
                                    <p className="text-sm text-gray-600">{candidate.email}</p>
                                </div>
                                <button className="px-4 py-2 bg-red-600 text-white rounded">Remove</button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    )
};