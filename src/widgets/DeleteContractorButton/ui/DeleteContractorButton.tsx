import { Box, Fab, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteContractorMutation } from '@/features/contractors/model/contractorsApi.ts';
import { useNavigate } from 'react-router';
import { DeleteConfirmationModal } from '@/widgets/DeleteConfirmationModal';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
    contractorId: number;
}

export const DeleteContractorButton = ({ contractorId }: Props) => {
    const [deleteContractor] = useDeleteContractorMutation();
    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);

    const handleDeleteContractor = useCallback(() => {
        deleteContractor(contractorId);
        navigate('/contractors');
        toast.success('Подрядчик успешно удален!')
        }, [deleteContractor, contractorId, navigate]
    );

    return (
        <>
            <DeleteConfirmationModal text="подрядчика" onConfirm={handleDeleteContractor} onClose={() => setOpenModal(false)} open={openModal} />
            <Box sx={{ position: 'fixed', bottom: -100, right: 20 }}>
                <Tooltip title="Удалить подрядчика" arrow>
                    <Fab
                        color="error"
                        sx={{
                            position: 'absolute',
                            bottom: 130,
                            right: 0,
                            boxShadow: 4,
                            transition: '0.3s ease-in-out',
                            '&:hover': { transform: 'scale(1.1)' },
                            zIndex: 0,
                        }}
                        onClick={() => setOpenModal(true)}
                    >
                        <DeleteIcon />
                    </Fab>
                </Tooltip>
            </Box>
        </>
    );
};
