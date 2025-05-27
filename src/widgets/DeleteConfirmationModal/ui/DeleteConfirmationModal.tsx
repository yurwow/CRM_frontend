import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { memo } from 'react';

interface DeleteConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    text?: string;
}

export const DeleteConfirmationModal = memo(({ open, onClose, onConfirm, text = 'клиента' }: DeleteConfirmationModalProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Подтверждение удаления</DialogTitle>
            <DialogContent>Вы уверены, что хотите удалить {text}? Это действие нельзя будет отменить.</DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Отмена
                </Button>
                <Button onClick={onConfirm} color="error">
                    Удалить
                </Button>
            </DialogActions>
        </Dialog>
    );
});
