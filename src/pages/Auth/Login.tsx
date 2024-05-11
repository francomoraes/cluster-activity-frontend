import React, { useState } from 'react';
import Input from '../../components/form/Input';
import { useUserContext } from '@/context/UserContext';

interface UserLogin {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [loginDetails, setLoginDetails] = useState<UserLogin>({
        email: '',
        password: ''
    });
    const { login } = useUserContext() as any;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(loginDetails);
    };

    return (
        <div className="max-w-md mx-auto my-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-xl font-semibold text-gray-900 mb-8">Login</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    text="Email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    value={loginDetails.email}
                />
                <Input
                    type="password"
                    text="Password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    value={loginDetails.password}
                />
                <button className="w-full bg-indigo-600 text-white p-2 rounded-lg mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
