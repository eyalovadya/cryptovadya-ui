import { useState } from 'react';
import Modal from './Modal';

type Props = {
    isOpen: boolean;
    children?: React.ReactNode;
    setIsOpen: (isOpen: boolean) => void;
    approve: () => Promise<void>;
    reject?: () => Promise<void>;
};

const AreYouSureModal = ({ isOpen, setIsOpen, approve, reject, children }: Props) => {
    const [isApproving, setIsApproving] = useState<boolean>(false);
    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            handleClose={handleClose}
            title="Are you sure?"
            containerProps={{
                width: '400px',
                height: 'auto'
            }}
            footerProps={{
                submitBtn: {
                    text: 'Yes',
                    onClick: async () => {
                        setIsApproving(true);
                        await approve();
                        handleClose();
                        setIsApproving(false);
                    },
                    loading: isApproving,
                    disabled: isApproving
                },
                cancelBtn: {
                    text: 'Cancel',
                    onClick: async () => {
                        await reject?.();
                        handleClose();
                    }
                }
            }}
        >
            {children}
        </Modal>
    );
};

export default AreYouSureModal;
