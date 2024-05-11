import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    text: string;
    multiple?: boolean;
    classNameContainer?: string;
    classNameInput?: string;
    classNameLabel?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            text,
            multiple,
            classNameContainer = 'mb-4',
            classNameInput = 'border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md shadow-sm',
            classNameLabel = 'block text-sm font-medium text-gray-700',
            ...props
        },
        ref
    ) => {
        return (
            <div className={classNameContainer}>
                <label htmlFor={props.name} className={classNameLabel}>
                    {text}
                </label>
                <input
                    ref={ref}
                    {...props}
                    {...(multiple ? { multiple } : {})}
                    className={`mt-1 p-3 block w-full ${classNameInput}`}
                />
            </div>
        );
    }
);

export default Input;
