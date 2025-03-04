import {Button} from "@mui/material";
import {logout} from "@/features/auth/model/authSlice.ts";
import {useAppDispatch} from "@/shared/lib/hooks/reduxHooks.ts";

export const LogoutButton = () => {
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <>
            <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                sx={{ marginTop: 2 }}
            >
                Выйти
            </Button>
        </>
    );
};
