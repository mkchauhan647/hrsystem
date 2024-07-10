'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from '@/components/Dashboard'
import Projects from '@/components/Projects'
import Jobs from '@/components/Jobs'
import Forms from '@/components/Forms'
import Interview from '@/components/Interview'
import JobPost from '@/components/JobPost'

import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig/firebaseConfig';
import { MdPostAdd } from "react-icons/md";
import { FcProcess } from "react-icons/fc";

const DashboardComponent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('Dashboard');

  const [user,setUser] = useState(null);

  const router = useRouter();

 

 

  useEffect(() => {
    
    setUser(JSON.parse(localStorage.getItem('user')));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        console.log(user.photoURL)
      } else {
        setUser(null);
        localStorage.removeItem('user');
        // if (!auth.currentUser) {
          router.push('/login');
        // }
      }
    
    });
  
  },[auth.currentUser])


 

  const renderComponent = () => {

    

    switch (selectedComponent) {
      case 'Dashboard':
        return <Dashboard />
      case 'Projects':
        return <Projects />
      case 'Jobs':
        return <Jobs/>
      case 'Forms':
        return <Forms />
      case 'Interview':
        return <Interview />
      case 'JobPost':
        return <JobPost/>
      default:
        return <Dashboard />
    }

  }

  const handleLogout = async () => {
    
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.log(error)
    }

  }


  return (
   user &&  <div className="flex h-screen bg-gray-200">
   {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"></div>}
   
   <div className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-[#333] lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'}`}>
     <div className="flex items-center justify-center mt-8">
       <div className="flex items-center">
         {/* <svg className="w-12 h-12" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
           {/* <path d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z" fill="#4C51BF" stroke="#4C51BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> */}
           {/* <path d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z" fill="white"></path> */}
         {/* </svg> */}
         <span className="mx-2 text-2xl font-semibold text-white"  >Dashboard</span>
       </div>
     </div>

     <nav className="mt-10">
       <div className=" cursor-pointer flex items-center px-6 py-2 mt-4 text-gray-100 bg-gray-700 bg-opacity-25"  onClick={()=>setSelectedComponent('Dashboard')}>
         <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
         </svg>
         <span className="mx-3" >Dashboard</span>
       </div>
       <div className=" cursor-pointer flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100" onClick={()=>setSelectedComponent('Projects')}>
         <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"></path>
         </svg>
         <span className="mx-3" >Projects</span>
       </div>
       <div className="cursor-pointer flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"  onClick={()=>setSelectedComponent('Jobs')}>
         <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
         </svg>
         <span className="mx-3" >Jobs</span>
       </div>
       <div className=" cursor-pointer flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100" onClick={()=>setSelectedComponent('Interview')}>
            <FcProcess className='w-6 h-6'/>
            <span className="mx-3" >Interviewing</span>
       </div>
       <div className=" cursor-pointer flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100" onClick={()=>setSelectedComponent('Forms')}>
         <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
         </svg>
         <span className="mx-3" >Forms</span>
          </div>
          <div className=" cursor-pointer flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100" onClick={()=>setSelectedComponent('JobPost')}>
            <MdPostAdd className='w-6 h-6'/>
            <span className="mx-3" >Post A Job</span>
       </div>
     </nav>
   </div>

   <div className="flex flex-col flex-1 overflow-hidden">
     <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
       <div className="flex items-center">
         <button onClick={() => setSidebarOpen(true)} className="text-gray-500 focus:outline-none lg:hidden">
           <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
           </svg>
         </button>
         <div className="relative mx-4 lg:mx-0">
           <span className="absolute inset-y-0 left-0 flex items-center pl-3">
             <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m4 4V3m4 4V3m1 12h6M3 21h18m-6-6H3m6 0H3"></path>
             </svg>
           </span>
           <input className="w-32 py-2 pl-10 pr-4 bg-gray-200 border border-transparent rounded-lg sm:w-64 focus:bg-white focus:border-indigo-300 focus:outline-none focus:shadow-outline" type="text" placeholder="Search" />
         </div>
       </div>
       <div className="flex items-center">
         <button onClick={() => setNotificationOpen(!notificationOpen)} className="flex mx-4 text-gray-600 focus:outline-none">
           <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a7.001 7.001 0 00-6-6.93V4a2 2 0 10-4 0v.07A7.001 7.001 0 002 11v3.159c0 .538-.214 1.055-.595 1.437L0 17h5m5 0v1a3 3 0 01-6 0v-1m6 0a3 3 0 01-6 0"></path>
           </svg>
         </button>

         <div className="relative">
           <button onClick={() => setDropdownOpen(!dropdownOpen)} className="relative block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none">
             <img className="object-cover w-full h-full" src={user.photoURL} alt="Your avatar" />
             
           </button>

           <div className={`absolute right-0 w-48 mt-2 py-2 bg-white border rounded shadow-xl ${dropdownOpen ? 'block' : 'hidden'}`}>
             <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Profile</a>
             <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Settings</a>
             <div className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white cursor-pointer" onClick={()=> handleLogout()}>Logout</div>
           </div>
         </div>
       </div>
     </header>
     
     {
       renderComponent()

     }

   </div>
 </div>
  );
}

export default DashboardComponent;
