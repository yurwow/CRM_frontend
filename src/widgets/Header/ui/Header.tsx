import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";
import {FC} from "react";
import {useAppSelector} from "@/shared/lib/hooks/reduxHooks.ts";

export const Header: FC = () => {
    const {isAuth} = useAppSelector(state => state.auth)

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                </IconButton>
                {isAuth ? <Button color="inherit" >Выйти</Button> : <Button color="inherit">Войти</Button>}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    My App
                </Typography>
                <Box>
                    <Button color="inherit">Главная</Button>
                    <Button color="inherit">О нас</Button>
                    <Button color="inherit">Контакты</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

