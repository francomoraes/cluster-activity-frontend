import { NavLink } from 'react-router-dom';

interface CustomNavLinkProps extends React.HTMLProps<HTMLLIElement> {
    to: string;
    label: string;
}

const CustomNavLink: React.FC<CustomNavLinkProps> = ({
    to,
    label,
    className,
    ...props
}) => {
    return (
        <li className={`flex ${className}`} {...props}>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    isActive
                        ? 'text-indigo-600 font-semibold px-4 py-2 hover:bg-gray-200 transition-all'
                        : 'text-gray-600 hover:text-gray-900 px-4 py-2 hover:bg-gray-200 transition-all'
                }
            >
                {label}
            </NavLink>
        </li>
    );
};

export default CustomNavLink;
