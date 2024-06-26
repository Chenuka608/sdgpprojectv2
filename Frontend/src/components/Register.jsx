import React ,{useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom';

import loginImg from '../images/login (2).jpg'
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../Utils/config';

const Register = () => {
// State for storing user credentials and error message
    const [credentials, setCredentials] = useState({
        username: undefined,
        email: undefined,
        password: undefined,
        address: undefined,
        fullname: undefined,
        age: undefined

    });

    const [error, setError] = useState('');
    const {dispatch} = useContext (AuthContext)
    const navigate = useNavigate()

    const handleChange = e => {
        setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
        setError('');
    };

 // Function to handle register button click
    const handleClick = async e =>{
        e.preventDefault();

       

        try {
             // Making API call to register endpoint
            const res = await fetch (`${BASE_URL}/auth/register`,{
                method:'post',
                headers:{
                    'content-type':'application/json',
                },
                body:JSON.stringify(credentials),
            })
            // Handling response
            const result = await res.json(credentials);

            if(!res.ok) {
                 // If response status is not ok, error message
                setError(result.message);
                // alert(result.message);
                return;
                
            }

 // If registration is successful, dispatch success action and navigate to login page
            dispatch({type:'REGISTER_SUCCESS'});
            navigate('/login');
            

        }catch (err){
            //display error message
            alert(err.message);

    }
}

  //Register form
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='hidden sm:block'>
            <img className='w-full h-full object-cover' src={loginImg} alt="" />
        </div>

        <div className='bg-gray-100 flex flex-col justify-center'>
            <form onSubmit={handleClick} className='max-w-[400px] w-full mx-auto bg-white p-4'>
                <h2 className='text-4xl font-bold text-center py-6'>INTERNOVA.</h2>
                <div className='flex flex-col py-2'>
                <label>Full Name</label>
                <input type="text" className='border p-2' required id="fullname" onChange={handleChange}/>
                </div>
                <div className='flex flex-col py-2'>
                <label>Address</label>
                <input type="text" className='border p-2' required id="address" onChange={handleChange}/>
                </div>
                <div className='flex flex-col py-2'>
                <label>Age</label>
                <input type="text" className='border p-2' required id="age" onChange={handleChange}/>
                </div>
                <div className='flex flex-col py-2'>
                <label>Username</label>
                <input type="text" className='border p-2' required id="username" onChange={handleChange}/>
                </div>
                <div className='flex flex-col py-2'>
                    <label>Email</label>
                    <input type="email" className='border p-2' required id="email" onChange={handleChange}/>
                </div>
                <div className='flex flex-col py-2'>
                    <label>Password</label>
                    <input type="password" className='border p-2' required id="password" onChange={handleChange}/>
                </div>
                {error && <p className="bg-red-100 text-red-900 text-sm px-4 py-2 mb-4 rounded-md">{error}</p>} 
                <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white'>Create Account</button>
                <div className='flex flex-col justify-center'>
                <p className='flex items-center '>Already have an account?<Link to='/login' className='ml-2 text-indigo-600 font-bold'>Login</Link></p>
                
                </div>
            </form>
        </div>
    </div>
  )
}
export default  Register;