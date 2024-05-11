import bus from '@/utils/bus';
import { useEffect, useState } from 'react';

const Message = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        bus.addListener(
            'flash',
            ({ msg, type }: { msg: string; type: string }) => {
                setVisible(true);
                setMessage(msg);
                setType(type);

                setTimeout(() => {
                    setVisible(false);
                }, 3000);
            }
        );
    }, []);

    if (!visible) return null;

    const typeToColorMapping: { [key: string]: string } = {
        error: 'bg-red-500',
        success: 'bg-green-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-400'
    };

    const bgColor = typeToColorMapping[type] || 'bg-gray-300';

    return (
        <div
            className={`fixed top-5 right-5 z-50 transition-opacity duration-300 ease-in-out ${bgColor} text-white px-4 py-2 rounded shadow-lg`}
        >
            <div>{message}</div>
        </div>
    );
};

export default Message;
