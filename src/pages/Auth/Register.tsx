import React, { useState } from 'react';
import Input from '../../components/form/Input';
import { useUserContext } from '@/context/UserContext';

interface User {
    name: string;
    email: string;
    password: string;
    confirmpassword: string;
}

const Register: React.FC = () => {
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    });
    const { register } = useUserContext() as any;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        register(user);
    };

    return (
        <div className="max-w-md mx-auto my-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-xl font-semibold text-gray-900 mb-8">
                Register
            </h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    text="Name"
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    value={user.name}
                />
                <Input
                    type="email"
                    text="Email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    value={user.email}
                />
                <Input
                    type="password"
                    text="Password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    value={user.password}
                />
                <Input
                    type="password"
                    text="Confirm Password"
                    name="confirmpassword"
                    placeholder="Confirm your password"
                    onChange={handleChange}
                    value={user.confirmpassword}
                />
                <button className="w-full bg-indigo-600 text-white p-2 rounded-lg mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
