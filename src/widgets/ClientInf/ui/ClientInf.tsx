import { Card, CardContent, Typography, Divider, Stack, Box, TextField, Button } from '@mui/material';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/reduxHooks.ts';
import { ChangeEvent, useEffect, useState } from 'react';
import { getClientsById, updateClient } from '@/features/clients/model/clientSlice.ts';
import CircularProgress from '@mui/material/CircularProgress';
import { IAddClient, IClient } from '@/entities/Client/types.ts';
import { toast } from 'react-toastify';
import { clientFields, nameField } from '@/widgets/ClientInf/constant/clientFields.tsx';
import WorkIcon from '@mui/icons-material/Apartment';

export const ClientInf = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { currentClient, status, error } = useAppSelector((state) => state.clients);

    const [isEditing, setIsEditing] = useState(false);
    const [clientData, setClientData] = useState(currentClient);

    useEffect(() => {
        dispatch(getClientsById({ id: Number(id) }));
    }, [dispatch, id]);

    useEffect(() => {
        if (currentClient) {
            setClientData(currentClient);
        }
    }, [currentClient]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setClientData((prevState) => {
            if (!prevState) return prevState;

            return {
                ...prevState,
                [name]: value || '',
            };
        });
    };

    const handleSave = () => {
        try {
            if (currentClient) {
                dispatch(updateClient({ id: Number(id), clientData: clientData as IAddClient })).unwrap();
                toast.success('Клиент успешно обновлён');
                setIsEditing(false);
            }
        } catch {
            toast.error('Ошибка обновления клиента');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (currentClient) {
            setClientData(currentClient);
        }
    };

    if (status === 'loading') return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;
    if (!currentClient) return <Typography>Клиент не найден</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Card
                sx={{
                    borderRadius: 4,
                    boxShadow: 6,
                    p: 3,
                    maxWidth: 600,
                    width: '100%',
                    bgcolor: 'linear-gradient(135deg, #ffffff, #f0f4ff)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': { transform: 'scale(1.02)' },
                }}
            >
                <CardContent>
                    {isEditing ? (
                        <>
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ p: 1, borderRadius: 2, bgcolor: '#f9f9f9' }}>
                                <Box
                                    sx={{
                                        color: 'primary.main',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 36,
                                        height: 36,
                                    }}
                                >
                                    <WorkIcon color="primary" />
                                </Box>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label={nameField.label}
                                    name={nameField.name}
                                    value={clientData?.[nameField.name as keyof IClient] || ''}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />
                            </Stack>
                        </>
                    ) : (
                        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ textAlign: 'center' }}>
                            {currentClient.name}
                        </Typography>
                    )}
                    {!isEditing && <Divider sx={{ mb: 3 }} />}
                    <Stack spacing={2}>
                        {clientFields.map(({ icon, label, name, color }, index) => (
                            <Stack key={index} direction="row" alignItems="center" spacing={2} sx={{ p: 1, borderRadius: 2, bgcolor: '#f9f9f9' }}>
                                <Box
                                    sx={{
                                        color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 36,
                                        height: 36,
                                    }}
                                >
                                    {icon}
                                </Box>
                                {isEditing ? (
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label={label}
                                        name={name}
                                        value={clientData?.[name as keyof IClient] || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <Typography variant="body1">
                                        <b>{label}:</b> {clientData?.[name as keyof IClient] || ''}
                                    </Typography>
                                )}
                            </Stack>
                        ))}
                    </Stack>

                    {isEditing ? (
                        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                Сохранить
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={handleCancel}>
                                Отменить
                            </Button>
                        </Stack>
                    ) : (
                        <Button variant="outlined" color="primary" fullWidth sx={{ mt: 3 }} onClick={() => setIsEditing(true)}>
                            Редактировать информацию
                        </Button>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};
