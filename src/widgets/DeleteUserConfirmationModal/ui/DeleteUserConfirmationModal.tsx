import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

interface DeleteUserConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const DeleteUserConfirmationModal = ({
    open,
    onClose,
    onConfirm,
}: DeleteUserConfirmationModalProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Подтверждение удаления</DialogTitle>
            <DialogContent>Вы уверены, что хотите удалить пользователя?</DialogContent>
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
};
