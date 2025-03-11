import { Modal, Box, Typography, Button, DialogActions } from "@mui/material";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/shared/lib/hooks/reduxHooks.ts";
import {getUser} from "@/features/users/model/userSlice.ts";

interface IProps {
    open: boolean;
    handleClose: () => void;
}

export const ProfileModal = ({ open, handleClose }: IProps) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch]);

    const users = {
        full_name: "John Doe",
        email: "johndoe@example.com",
    };

    const { user, status, error } = useAppSelector((state) => state.users);


    console.log(user, status, error, 'юзеры')

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" mb={2}>
                    Личный кабинет
                </Typography>
                <Typography variant="body1">
                    <strong>Имя:</strong> {users.full_name}
                </Typography>
                <Typography variant="body1" mt={1}>
                    <strong>Email:</strong> {users.email}
                </Typography>
                <DialogActions sx={{ mt: 0 }}>
                    <Button onClick={handleClose} variant="contained">
                        Закрыть
                    </Button>
                </DialogActions>
            </Box>
        </Modal>
    );
};
