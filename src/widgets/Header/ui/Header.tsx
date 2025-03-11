import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router";
import {LogoutButton} from "@/widgets/LogoutButton";

export const Header = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
            <Container>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                        Clients CRM
                    </Typography>
                    <Box>
                        <Button color="inherit" onClick={() => navigate("/")} sx={{ fontSize: "1rem", mx: 1 }}>
                            Клиенты
                        </Button>
                        <Button color="inherit" onClick={() => navigate("/statistics")} sx={{ fontSize: "1rem", mx: 1 }}>
                            Статистика
                        </Button>
                    </Box>
                    <LogoutButton/>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
