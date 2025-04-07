import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';
import { useNavigate } from 'react-router';
import { LoginFormInputs, loginSchema } from '@/features/auth/model/LoginFormSchema.ts';
import { useLoginMutation } from '@/features/auth/model/authApi.ts';

const LoginForm = () => {
    const navigate = useNavigate();
    const [login, { isLoading, error }] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const result = await login(data).unwrap();
            console.log('Авторизация успешна:', result);
            navigate('/');
        } catch (err) {
            console.error('Ошибка входа:', err);
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
                        {...register('email')}
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
                        {isLoading ? 'Загрузка...' : 'Войти'}
                    </Button>
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            Ошибка входа
                        </Alert>
                    )}
                </form>
            </Box>
        </Container>
    );
};

export default LoginForm;
