import { Avatar, Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useGetContractorByIdQuery, useUpdateContractorMutation } from '@/features/contractors/model/contractorsApi.ts';
import { Loader } from '@/widgets/Loader';

interface Props {
    contractorId: number;
}

interface ContractorFormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    specialization: string;
    info: string;
    contact_person: string;
    average_rating: string | null;
}

export const CardContractor = ({ contractorId }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateContractor] = useUpdateContractorMutation();
    const { data: contractorData, isLoading, isError } = useGetContractorByIdQuery(contractorId);
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { isSubmitting },
    } = useForm<ContractorFormData>({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            specialization: '',
            info: '',
            contact_person: '',
            average_rating: null,
        },
    });

    const watchedValues = watch();

    useEffect(() => {
        if (contractorData) {
            reset(contractorData);
        }

    }, [contractorData, reset]);

    const onSubmit = async (data: ContractorFormData) => {
        try {
            await updateContractor({ id: contractorId, data }).unwrap();
            setIsEditing(false);
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        reset(contractorData);
        setIsEditing(false);
    };

    if (isLoading) return <Loader />;
    if (isError || !contractorData) return <Typography sx={{ mt: 4, textAlign: 'center' }}>Ошибка загрузки данных</Typography>;

    return (
        <Card sx={{ p: 2 }}>
            <CardContent sx={{ display: 'flex', gap: 3 }}>
                <Avatar sx={{ width: 80, height: 80, fontSize: 32 }}>{watchedValues.name?.[0] || 'П'}</Avatar>

                <Box sx={{ flexGrow: 1 }}>
                    {isEditing ? (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Название обязательно' }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField {...field}
                                       fullWidth
                                       label="Название"
                                       error={!!error}
                                       helperText={error?.message}
                                       sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: 'Email обязателен',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Некорректный email адрес',
                                    },
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        error={!!error}
                                        helperText={error?.message}
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            <Controller
                                name="phone"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField {...field}
                                       fullWidth
                                       label="Телефон"
                                       error={!!error}
                                       helperText={error?.message}
                                       sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            <Controller
                                name="contact_person"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Контактное лицо"
                                        error={!!error}
                                        helperText={error?.message}
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            <Controller
                                name="specialization"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Специализация"
                                        error={!!error}
                                        helperText={error?.message}
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            <Controller
                                name="info"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="Дополнительная информация"
                                        error={!!error}
                                        helperText={error?.message}
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />


                            <Controller
                                name="address"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Адрес"
                                        multiline
                                        rows={2}
                                        error={!!error}
                                        helperText={error?.message}
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />
                        </form>
                    ) : (
                        <>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                {watchedValues.name}
                            </Typography>
                            <Typography color="text.secondary">📧 {watchedValues.email}</Typography>
                            <Typography color="text.secondary">📞 {watchedValues.phone}</Typography>
                            <Typography color="text.secondary">👤 Контактное лицо: {watchedValues.contact_person}</Typography>
                            <Typography color="text.secondary">🛠️ Специализация: {watchedValues.specialization}</Typography>
                            <Typography color="text.secondary">📝 Дополнительная информация: {watchedValues.info}</Typography>
                            <Typography color="text.secondary">📍 Адрес: {watchedValues.address}</Typography>
                        </>
                    )}

                    <Typography color="text.secondary" sx={{ mt: 2 }}>
                        ⭐ Средняя оценка: {watchedValues.average_rating ? Number(watchedValues.average_rating).toFixed(1) : '—'}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {isEditing ? (
                        <>
                            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
                                {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={handleCancel} disabled={isSubmitting}>
                                Отмена
                            </Button>
                        </>
                    ) : (
                        <Button variant="outlined" color="primary" onClick={handleEdit}>
                            Редактировать
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};
