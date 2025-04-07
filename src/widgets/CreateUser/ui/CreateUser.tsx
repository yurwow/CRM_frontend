import { useState } from 'react';
import { Button, Grid, MenuItem, TextField, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/shared/lib/hooks/reduxHooks.ts';
import { createUser } from '@/features/users/model/userSlice.ts';
import { toast } from 'react-toastify';
import { AddClientButton } from '@/widgets/AddClientButton';

const roles = ['manager', 'admin'];

interface IFormInput {
    full_name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

export const CreateUser = () => {
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<IFormInput>();
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const onSubmit = async (data: IFormInput) => {
        setLoading(true);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...userData } = data;

        try {
            await dispatch(createUser(userData)).unwrap();
            toast.success('Пользователь успешно создан');
            reset();
            handleClose();
        } catch {
            const errorMessage = 'Ошибка при создании пользователя';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const password = watch('password');

    return (
        <>
            <AddClientButton onClick={handleClickOpen} />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Создание нового пользователя</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Полное имя"
                                    {...register('full_name', { required: 'Поле обязательно для заполнения' })}
                                    fullWidth
                                    error={!!errors.full_name}
                                    helperText={errors.full_name?.message}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    {...register('email', {
                                        required: 'Поле обязательно для заполнения',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,4}$/,
                                            message: 'Неверный формат email',
                                        },
                                    })}
                                    fullWidth
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Пароль"
                                    type="password"
                                    {...register('password', { required: 'Поле обязательно для заполнения' })}
                                    fullWidth
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Подтверждение пароля"
                                    type="password"
                                    {...register('confirmPassword', {
                                        required: 'Поле обязательно для заполнения',
                                        validate: (value) => value === password || 'Пароли не совпадают',
                                    })}
                                    fullWidth
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Роль"
                                    {...register('role', { required: 'Поле обязательно для заполнения' })}
                                    select
                                    fullWidth
                                    error={!!errors.role}
                                    helperText={errors.role?.message}
                                >
                                    {roles.map((role) => (
                                        <MenuItem key={role} value={role}>
                                            {role}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}>
                                    {loading ? 'Создание...' : 'Создать пользователя'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
