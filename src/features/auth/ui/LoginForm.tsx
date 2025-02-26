import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axios from "axios";
import {useNavigate} from "react-router";
import {LoginFormInputs, loginSchema} from "@/features/auth/model/LoginFormSchema.ts";
import {useAuth} from "@/shared/lib/hooks/useAuth.ts";

const LoginForm = () => {
    const navigate = useNavigate()
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            console.log("Login Data:", data);

            const res = await axios.post("http://localhost:3000/api/auth/login", data);

            if (res.status === 200) {
                const { accessToken } = res.data;

                if (accessToken) {
                    login(accessToken);
                    navigate("/");
                } else {
                    console.error("Токен отсутствует в ответе сервера");
                }
            } else {
                console.error("Ошибка авторизации:", res.status, res.statusText);
            }
        } catch (error) {
            console.error("Ошибка входа:", error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    mt: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Вход в систему
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        {...register(`email`)}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        fullWidth
                        margin="normal"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Войти
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default LoginForm;
