import Input from '@/components/form/Input';
import useFlashMessage from '@/hooks/useFlashMessage';
import api from '@/utils/api';
import React, { useEffect, useRef, useState } from 'react';

interface UserProps {
    avatar: string;
    createdAt: string;
    email: string;
    name: string;
    updatedAt: string;
    id: string;
    password: string;
    confirmpassword: string;
}

const Profile = () => {
    const [user, setUser] = useState<UserProps>({
        avatar: '',
        createdAt: '',
        email: '',
        name: '',
        updatedAt: '',
        id: '',
        password: '',
        confirmpassword: ''
    });
    const [token] = useState(localStorage.getItem('token') || '');
    const cleanToken = token.replace(/^"|"$/g, '').replace(/\\(.)/gm, '$1');
    const { setFlashMessage } = useFlashMessage() as any;
    const [preview, setPreview] = useState<Blob | MediaSource>();
    const [imgSrc, setImgSrc] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            console.error('Authorization token is not available');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await api.get('/users/checkuser', {
                    headers: {
                        Authorization: `Bearer ${cleanToken}`
                    }
                });
                setUser(response.data.user);
            } catch (err) {
                console.error('Failed to fetch user data:', err);
            }
        };

        fetchUserData();
    }, [token]);

    useEffect(() => {
        if (user.avatar) {
            setImgSrc(
                `${import.meta.env.VITE_APP_API}/images/users/${user.avatar}`
            );
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreview(e.target.files?.[0]);
        setUser({
            ...user,
            [e.target.name]: e.target.files?.[0]
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let msgType = 'success';

        const formData = new FormData();

        Object.keys(user).forEach((key) => {
            const value = user[key as keyof UserProps];
            if (value !== undefined) {
                formData.append(key, value);
            }
        });

        formData.append('user', JSON.stringify(user));

        const url = `/users/edit/${user.id}`;

        const data = await api
            .patch(url, formData, {
                headers: {
                    Authorization: `Bearer ${cleanToken}`
                }
            })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                msgType = 'error';
                return err.response.data.error;
            });

        setFlashMessage(data, msgType);
        if (msgType === 'success') {
            setUser((prev) => ({
                ...prev,
                password: '',
                confirmpassword: ''
            }));
            fileInputRef.current?.value && (fileInputRef.current.value = '');
        }
    };

    return (
        <div>
            <div className="mt-6 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <div className="flex gap-4 items-center">
                    {user.avatar && (
                        <img
                            src={
                                preview ? URL.createObjectURL(preview) : imgSrc
                            }
                            alt={user.name}
                            className="w-32 h-32 p-1 bg-gray-700 rounded-full"
                        />
                    )}
                    <h1 className="text-6xl font-semibold text-gray-900 mb-6">
                        Edit Profile
                    </h1>
                </div>
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
                        placeholder="New password"
                        onChange={handleChange}
                        value={(user.password as string) || ''}
                    />
                    <Input
                        type="password"
                        text="Confirm Password"
                        name="confirmpassword"
                        placeholder="Confirm new password"
                        onChange={handleChange}
                        value={(user.confirmpassword as string) || ''}
                    />
                    <Input
                        type="file"
                        text="Upload file"
                        name="avatar"
                        placeholder="Change your avatar picture"
                        onChange={onFileChange}
                        classNameInput="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-400 file:text-white file:cursor-pointer hover:file:bg-blue-600 hover:bg-gray-200 transition-all"
                        ref={fileInputRef}
                    />
                    <button className="mt-4 w-full bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-600">
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
