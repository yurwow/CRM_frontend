import { Box, Typography, Button } from "@mui/material";
import {useNavigate} from "react-router";

const NotFoundPage = () => {
    const navigate = useNavigate()
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
                textAlign: "center",
                padding: 3,
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontSize: "5rem",
                    fontWeight: "bold",
                    color: "#ff6347",
                }}
            >
                404
            </Typography>
            <Typography
                variant="h4"
                sx={{
                    color: "#333",
                    marginBottom: 2,
                }}
            >
                Страница не найдена
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
                sx={{
                    padding: "10px 20px",
                    fontSize: "1rem",
                    borderRadius: "5px",
                }}
            >
                Вернуться на главную
            </Button>
        </Box>
    );
};

export default NotFoundPage;
