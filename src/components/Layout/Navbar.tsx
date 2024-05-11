import { useUserContext } from '@/context/UserContext';
import CustomNavLink from './components/CustomNavLink';

const Navbar = () => {
    const { authenticated, logout } = useUserContext() as any;

    return (
        <nav className="bg-white shadow-lg">
            <ul className="flex justify-between items-center max-w-md mx-auto">
                <CustomNavLink to={'/'} label="Home" />
                {!authenticated ? (
                    <>
                        <CustomNavLink to={'/login'} label="Login" />
                        <CustomNavLink to={'/register'} label="Register" />
                    </>
                ) : (
                    <>
                        <CustomNavLink to={'/workspaces'} label="Workspaces" />
                        <CustomNavLink to={'/user/profile'} label="Profile" />
                        <CustomNavLink
                            to={'/logout'}
                            label="Logout"
                            onClick={logout}
                        />
                    </>
                )}
                <CustomNavLink to={'/contact'} label="Contact" />
            </ul>
        </nav>
    );
};

export default Navbar;
