'use client'
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import Link from "next/link"
import { auth } from "@/firebaseConfig/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useContext } from "react";
import { FirebaseContext } from "@/firebaseConfig";
export default function LoginPage() {

    // const {auth} = useContext(FirebaseContext);

    const router = useRouter();
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const customCheckRef = useRef(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Form submitted")
        

        const email = emailRef.current.value;
        const password = passRef.current.value;
        const remember = customCheckRef.current.checked;
        console.log(email, password, remember)

        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log(user)
            localStorage.setItem('user', JSON.stringify(user));
            router.push('/');
        } catch (error) {
            console.log(error)
       }





    }

    const handleGoogleSignIn = async () => {
        // console.log("Google Sign In")
        try {
            const provider = new GoogleAuthProvider();
            const user = await signInWithPopup(auth, provider);
            console.log(user)
            localStorage.setItem('user', JSON.stringify(user));
            router.push('/');
            return;
        } catch (error) {
            console.log(error);
            return;
        }
    }   


    return (
        <>
        
<link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"/>
<link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"/>


<section className="bg-gray-300 h-screen my-auto flex justify-center items-center ">
  <div className="w-full lg:w-4/12 px-4 mx-auto pt-6">
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
      <div className="rounded-t mb-0 px-6 py-6">
        <div className="text-center mb-3">
          <h6 className="text-blueGray-500 text-sm font-bold">
            Sign in with
          </h6>
        </div>
        <button className="flex mx-auto items-center mb-2 justify-center px-3 py-2.5 space-x-2 bg-white border border-slate-600 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
            <svg viewBox="0 0 48 48" width="24" height="24" fill="#000000">
                <g id="SVGRepo_iconCarrier">
                    <title>Google-color</title>
                    <g id="Color-" transform="translate(-401.000000, -860.000000)">
                        <g id="Google" transform="translate(401.000000, 860.000000)">
                            <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" fill="#FBBC05"></path>
                            <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" fill="#EB4335"></path>
                            <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" fill="#34A853"></path>
                            <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" fill="#4285F4"></path>
                        </g>
                    </g>
                </g>
            </svg>
            <span className="text-gray-700 font-medium" onClick={handleGoogleSignIn}>Continue with Google</span>
        </button>
        <hr className="mt-6 border-b-1 border-blueGray-300"/>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <div className="text-blueGray-400 text-center mb-3 font-bold">
          <small>Or sign in with credentials</small>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Email</label><input ref={emailRef} type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Email"/>
          </div>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Password</label><input ref={passRef} type="password" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Password"/>
          </div>
          <div>
            <label className="inline-flex items-center cursor-pointer"><input ref={customCheckRef} id="customCheckLogin" type="checkbox" className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"/><span className="ml-2 text-sm font-semibold text-blueGray-600">Remember me</span></label>
          </div>
          <div className="text-center mt-6">
            <button  className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="button"> Sign In </button>
          </div>
                            </form>
            
                              
                                <div className="text-center mt-6">
                                <p>
                                    Forget 
                                    <a href="#" className="text-blueGray-500"> password ? </a>
                               </p>
                            </div>
                            <div className="text-center mt-6">
                                <p>
                                    Don't have an account? 
                                    {/* <a href="/signup" className="text-blueGray-500"> Sign Up</a> */}
                                    <Link href="/signup" className="text-blueGray-500"> Sign Up</Link>
                               </p>
            </div>

      </div>
    </div>
  </div>
 
</section>

            </>
            )
        }