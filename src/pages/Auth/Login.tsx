import React, { useEffect, useState } from 'react';
import Input from '../../components/form/Input';
import { useUserContext } from '@/context/UserContext';
import { Button } from '@material-tailwind/react';
import api from '@/utils/api';

interface UserLogin {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [loginDetails, setLoginDetails] = useState<UserLogin>({
        email: '',
        password: ''
    });
    const { login, setAuthenticated } = useUserContext() as any;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(loginDetails);
    };

    const navigate = (url: string) => {
        window.location.href = url;
    };

    async function googleAuth() {
        const response = await fetch(
            `${import.meta.env.VITE_APP_API}/request`,
            {
                method: 'post'
            }
        );
        const data = await response.json();
        navigate(data.url);
    }

    async function handleGoogleResonse() {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (!token) return;

        localStorage.setItem('token', JSON.stringify(token));
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setAuthenticated(true);
        navigate('/');
    }

    useEffect(() => {
        handleGoogleResonse();
    }, []);

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
            <h3>Google OAuth!</h3>
            <Button type="button" onClick={() => googleAuth()}>
                Google Sign In
            </Button>
        </div>
    );
};

export default Login;
