import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { logout } from '@/features/auth/model/authSlice.ts';
import { useAppDispatch } from '@/shared/lib/hooks/reduxHooks.ts';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const LogoutButton = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/login');
    };

    return (
        <>
            <Button color="inherit" onClick={() => setOpen(true)} sx={{ fontSize: '1rem', mx: 1 }}>
                Выйти
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Вы уверены, что хотите выйти?</DialogTitle>
                <DialogContent>Это завершит вашу текущую сессию.</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleLogout} color="error" autoFocus>
                        Выйти
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
