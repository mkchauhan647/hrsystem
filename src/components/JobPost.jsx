import { useState } from 'react';
import axios from 'axios';
import { jobsData } from '@/data/dummyJobs'
import { toast, ToastContainer } from 'react-toastify';
const JobPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    jobDescription: '',
    requirements: [],
  });

  const handleChange = (e) => {
    //   if (e.target.name == 'requirements') {
       
    //       const arrayReq = [];
    //       //   e.target.value.split(','|| '\n').
    //        // Split requirements by commas or newlines using regex
    //       const requirementsArray = e.target.value.split(/[\n,]+/).map(item => item.trim()).filter(item => item);
    //       console.log('rarray', requirementsArray);
          
    //       setFormData({
    //           ...formData,
    //           requirements:requirementsArray
    //       })
          
    //   }
    //   else {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
    //   }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        // / Split requirements by commas or newlines using regex
          const requirementsArray = formData.requirements.split(/[\n,]+/).map(item => item.trim()).filter(item => item);
          console.log('rarra',requirementsArray)
          const response = await axios.post('/api/jobs', {
              ...formData,
              requirements:requirementsArray
      });
          console.log('Job posted successfully:', response.data);
          if (response.status == 200) {
            toast.success('Job Inserted Successfully !')
        }
      // Optionally, reset the form or show a success message
    } catch (error) {
      console.error('Error posting job:', error);
    }
    };
    

    const handleInsertDummyJobs = () => {

    //     jobsData.forEach(async (job) => {
    //         try {
    //             const response = await axios.post('/api/jobs', job);

    //             if (response.status == 200) {
    //                 toast.success('Job Inserted Successfully !')
    //             }

    //         } catch (error) {
    //             console.log(error);
    //      }
        //  })
        toast.success("Already inserted Thank you !")
        
    }


  return (
      
          <div className='relative  w-[80%] mx-auto h-full'>
              
    <button className='p-2 mt-8 ml-8 rounded-sm bg-green-400 hover:bg-green-500 transition-all duration-500 ' onClick={handleInsertDummyJobs}>Insert Dummy Jobs</button>
              
     <form onSubmit={handleSubmit} className='relative  flex flex-col p-8 gap-4 '>
      <div className=''>
        <label className='block'>Job Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
                          onChange={handleChange}
                          className='w-[70%] mx-auto p-2'
        />
      </div>
      <div>
        <label className='block'>Company Name:</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
                          onChange={handleChange}
                          className=' p-2'
        />
      </div>
      <div>
        <label className='block'>Job Description:</label>
        <textarea
          name="jobDescription"
          value={formData.jobDescription}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border-2 rounded text-gray-700"
                          rows="3"
                          
        ></textarea>
      </div>
      <div>
        <label className='block'>Requirements: (comma or newline seperated)</label>
        <textarea
          name="requirements"
          value={formData.requirements}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border-2 rounded text-gray-700 " rows="3"
        ></textarea>
      </div>
      <button type="submit" className=' bg-blue-400 hover:bg-blue-500 text-white rounded-md p-2 border border-none w-32 transition-all duration-500'>Post Job</button>
    </form>
    <ToastContainer/>
      </div>
  );
};

export default JobPost;
