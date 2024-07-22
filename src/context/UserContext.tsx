import useAuth from '@/hooks/useAuth';
import { createContext, useContext } from 'react';

const UserContext = createContext({});

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

export default function UserProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const { register, login, authenticated, setAuthenticated, logout } =
        useAuth();
    return (
        <UserContext.Provider
            value={{ register, login, authenticated, setAuthenticated, logout }}
        >
            {children}
        </UserContext.Provider>
    );
}
