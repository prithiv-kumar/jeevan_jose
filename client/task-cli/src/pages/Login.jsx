import React, { useState } from 'react'
import logo from '../assets/logo/android-chrome-512x512.png'
import { Link, useNavigate } from 'react-router-dom'
import config from '../funtions/config';
import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [responseData, setResponseData] = useState(null);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${config.base_url}/auth/login/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            // setResponseData(response.data);
            Cookies.set('access', response.data.access)
            if (response.data) {
                navigate('/projects')
            }

            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className='invert-1 bg-gray-900 hover:bg-black  transition-all rounded-lg'>
                        <img
                            className="mx-auto h-28 w-auto "
                            src={logo}
                            alt="Your Company"
                        />
                    </div>
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign In
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    autoComplete="username"
                                    required
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login