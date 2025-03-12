import { useAppDispatch } from '@/shared/lib/hooks/reduxHooks.ts';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { addClient } from '@/features/clients/model/clientSlice.ts';
import { IAddClient } from '@/entities/Client/types.ts';
import { clientSchema, formatPhoneNumber } from '@/entities/Client/model/ClientSchema.ts';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { AddClientButton } from '@/widgets/AddClientButton';

export const CreateClientModal = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(clientSchema),
    });

    useEffect(() => {
        if (open) reset();
    }, [open, reset]);

    const onSubmit = async (data: IAddClient) => {
        try {
            await dispatch(addClient(data)).unwrap();
            toast.success('Клиент успешно создан!');
            reset();
            onClose();
        } catch {
            toast.error('При создании клиента произошла ошибка!');
        }
    };

    const onClose = () => setOpen(false);

    return (
        <>
            <AddClientButton onClick={() => setOpen(true)} />

            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>Создание клиента</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <TextField
                            label="Название"
                            fullWidth
                            {...register('name')}
                            error={!!errors.name}
                            helperText={errors.name?.message as string}
                        />
                        <TextField
                            label="Контактное лицо"
                            fullWidth
                            {...register('contact_person')}
                            error={!!errors.contact_person}
                            helperText={errors.contact_person?.message as string}
                        />
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Телефон"
                                    fullWidth
                                    {...field}
                                    value={field.value || ''}
                                    onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
                                    error={!!errors.phone}
                                    helperText={errors.phone?.message}
                                />
                            )}
                        />
                        <TextField
                            label="Email"
                            fullWidth
                            {...register('email')}
                            error={!!errors.email}
                            helperText={errors.email?.message as string}
                        />
                        <TextField
                            label="Адрес"
                            fullWidth
                            {...register('address')}
                            error={!!errors.address}
                            helperText={errors.address?.message as string}
                        />
                        <TextField
                            label="Индустрия"
                            fullWidth
                            {...register('industry')}
                            error={!!errors.industry}
                            helperText={errors.industry?.message as string}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ mr: 2, mb: 1 }}>
                    <Button onClick={onClose} color="error">
                        Отмена
                    </Button>
                    <Button onClick={handleSubmit(onSubmit)} variant="contained">
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
