import { Dialog } from '@material-tailwind/react';

const CustomModal = ({
    open,
    handleOpen
}: {
    open: boolean;
    handleOpen: () => void;
}) => {
    return (
        <Dialog
            open={open}
            handler={handleOpen}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
        >
            <div>modal</div>
        </Dialog>
    );
};

export default CustomModal;
