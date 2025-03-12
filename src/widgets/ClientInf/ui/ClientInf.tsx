import { Card, CardContent, Typography, Divider, Stack, Box, TextField, Button } from '@mui/material';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/reduxHooks.ts';
import { ChangeEvent, useEffect, useState } from 'react';
import { getClientsById, updateClient } from '@/features/clients/model/clientSlice.ts';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import CircularProgress from '@mui/material/CircularProgress';
import { IAddClient } from '@/entities/Client/types.ts';
import { toast } from 'react-toastify';

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
                    <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ textAlign: 'center' }}>
                        {isEditing ? 'Редактировать клиента' : currentClient.name}
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Stack spacing={2}>
                        {[
                            {
                                icon: <ContactMailIcon />,
                                label: 'Контактное лицо',
                                name: 'contact_person',
                                value: clientData?.contact_person || '',
                                color: 'primary.main',
                            },
                            {
                                icon: <PhoneIcon />,
                                label: 'Телефон',
                                name: 'phone',
                                value: clientData?.phone || '',
                                color: 'green',
                            },
                            {
                                icon: <EmailIcon />,
                                label: 'Email',
                                name: 'email',
                                value: clientData?.email || '',
                                color: 'red',
                            },
                            {
                                icon: <HomeIcon />,
                                label: 'Адрес',
                                name: 'address',
                                value: clientData?.address || '',
                                color: 'orange',
                            },
                            {
                                icon: <BusinessIcon />,
                                label: 'Индустрия',
                                name: 'industry',
                                value: clientData?.industry || '',
                                color: 'purple',
                            },
                        ].map(({ icon, label, name, value, color }, index) => (
                            <Stack
                                key={index}
                                direction="row"
                                alignItems="center"
                                spacing={2}
                                sx={{ p: 1, borderRadius: 2, bgcolor: '#f9f9f9' }}
                            >
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
                                        value={value}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <Typography variant="body1">
                                        <b>{label}:</b> {value}
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
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3 }}
                            onClick={() => setIsEditing(true)}
                        >
                            Редактировать информацию
                        </Button>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};
