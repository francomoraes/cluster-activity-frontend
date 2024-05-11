import api from '@/utils/api';
import useFlashMessage from './useFlashMessage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    name: string;
    email: string;
    password: string;
}

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const navigatge = useNavigate();

    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }
    }, []);

    async function register(user: User) {
        let msgText = 'User registered successfully';
        let msgType = 'success';

        try {
            const data = await api.post('/users/register', user).then((res) => {
                return res.data;
            });

            await authUser(data);
        } catch (error: any) {
            msgText = error.response.data.message;
            msgType = 'error';
        }

        setFlashMessage(msgText, msgType);
    }

    async function login(user: User) {
        let msgText = 'User logged in successfully';
        let msgType = 'success';

        try {
            const data = await api.post('/users/login', user).then((res) => {
                return res.data;
            });
            await authUser(data);
        } catch (error: any) {
            msgText = error?.response?.data?.message;
            msgType = 'error';
        }

        setFlashMessage(msgText, msgType);
    }

    async function authUser(data: any) {
        setAuthenticated(true);
        localStorage.setItem('token', JSON.stringify(data.token));
        navigatge('/');
    }

    function logout() {
        const msgText = 'User logged out successfully';
        const msgType = 'success';

        setAuthenticated(false);
        localStorage.removeItem('token');

        api.defaults.headers.Authorization = null;

        navigatge('/');

        setFlashMessage(msgText, msgType);
    }

    return {
        register,
        login,
        authenticated,
        logout
    };
}
