import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';
import { useNavigate } from 'react-router';
import { LoginFormInputs, loginSchema } from '@/features/auth/model/LoginFormSchema.ts';
import { login } from '@/features/auth/model/authSlice.ts';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/reduxHooks.ts';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormInputs) => {
        const resultAction = await dispatch(login(data));
        if (login.fulfilled.match(resultAction)) {
            navigate('/');
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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        {status === 'loading' ? 'Загрузка...' : 'Войти'}
                    </Button>
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                </form>
            </Box>
        </Container>
    );
};

export default LoginForm;
