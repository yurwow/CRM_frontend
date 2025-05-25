import { Controller, useForm } from 'react-hook-form';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { formatPhoneNumber } from '@/entities/Client/model/ClientSchema.ts';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { AddClientButton } from '@/widgets/AddClientButton';
import { Contractor } from '@/entities/Contractors/types.ts';
import { useCreateContractorMutation } from '@/features/contractors/model/contractorsApi.ts';

export const CreateContractorModal = () => {
    const [open, setOpen] = useState(false);
    const [createContractor] = useCreateContractorMutation();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        if (open) reset();
    }, [open, reset]);

    const onSubmit = async (data: Partial<Contractor>) => {
        try {
            await createContractor(data).unwrap();
            toast.success('Подрядчик успешно создан!');
            reset();
            onClose();
        } catch {
            toast.error('При создании подрядчика произошла ошибка!');
        }
    };

    const onClose = () => setOpen(false);

    return (
        <>
            <AddClientButton onClick={() => setOpen(true)} />

            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>Создание подрядчика</DialogTitle>
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
                            label="Специализация"
                            fullWidth
                            {...register('specialization')}
                            error={!!errors.industry}
                            helperText={errors.industry?.message as string}
                        />
                        <TextField
                            label="Адрес"
                            fullWidth
                            {...register('address')}
                            error={!!errors.address}
                            helperText={errors.address?.message as string}
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
