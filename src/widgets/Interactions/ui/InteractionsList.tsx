import {
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
    Paper,
    Chip,
    Fade,
    Box,
    Divider,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/reduxHooks.ts';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getInteractionsById, removeInteractionById } from '@/features/interactions/model/interactionsSlice.ts';
import { CreateInteractionModal } from '@/widgets/CreateInteractionModal';
import { DeleteConfirmationModal } from '@/widgets/DeleteConfirmationModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IInteraction } from '@/entities/Interactions/types.ts';
import { FabButton } from '@/widgets/FabButton';
import { DeleteClientById } from '@/features/clients/model/clientSlice.ts';
import EventIcon from '@mui/icons-material/Event';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

export const InteractionsList = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        interactions,
        status: interactionsStatus,
        error: interactionsError,
    } = useAppSelector((state) => state.interactions);

    useEffect(() => {
        dispatch(getInteractionsById({ id: Number(id) }));
    }, [dispatch, id]);

    const [open, setOpen] = useState(false);
    const [editingInteraction, setEditingInteraction] = useState<IInteraction | null>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleDelete = () => {
        try {
            dispatch(DeleteClientById({ id: Number(id) }));
            setOpenDeleteDialog(false);
            toast.success('Клиент успешно удален');

            navigate('/');
        } catch {
            toast.error('Ошибка удаления клиента');
        }
    };

    const handleEdit = (interaction: IInteraction) => {
        setEditingInteraction(interaction);
        setOpen(true);
    };

    const handleDeleteInteraction = async (interactionId?: number) => {
        if (interactionId === undefined) {
            toast.error('Ошибка: ID взаимодействия не найден');
            return;
        }

        try {
            await dispatch(removeInteractionById({ id: interactionId })).unwrap();
            toast.success('Взаимодействие удалено');
        } catch {
            toast.error('Ошибка при удалении');
        }
    };

    return (
        <div>
            <Typography variant="h4" sx={{ mb: 3, mt: 3, textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
                История взаимодействий
            </Typography>
            <Box
                sx={{
                    maxWidth: 600,
                    mx: 'auto',
                    p: 0,
                    bgcolor: 'linear-gradient(135deg, #ffffff, #f0f4ff)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': { transform: 'scale(1.02)' },
                }}
            >
                {interactionsStatus === 'loading' && (
                    <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
                )}
                {interactionsError && <Typography color="error">{interactionsError}</Typography>}

                <Fade in={true} timeout={600}>
                    <Paper
                        elevation={6}
                        sx={{ p: 3, borderRadius: 4, bgcolor: '#fff', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)' }}
                    >
                        {interactions.length === 0 ? (
                            <Typography textAlign="center" sx={{ fontStyle: 'italic', color: 'gray' }}>
                                Нет взаимодействий
                            </Typography>
                        ) : (
                            <List>
                                {interactions.map((interaction) => (
                                    <Box key={interaction.id}>
                                        <ListItem
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: 2,
                                                bgcolor: '#fafafa',
                                                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                                                mb: 1,
                                                transition: '0.3s ease-in-out',
                                                '&:hover': { backgroundColor: '#eef2ff' },
                                            }}
                                            secondaryAction={
                                                <>
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleEdit(interaction)}
                                                        sx={{ mr: 1 }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleDeleteInteraction(interaction.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </>
                                            }
                                        >
                                            <Chip
                                                label={interaction.type}
                                                color="secondary"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    fontSize: '0.85rem',
                                                    px: 1.5,
                                                    py: 0.5,
                                                    mr: 2,
                                                }}
                                            />
                                            <ListItemText
                                                primary={
                                                    <Typography component="span">
                                                        <Box
                                                            sx={{
                                                                maxHeight: '60px',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: 'vertical',
                                                            }}
                                                        >
                                                            {interaction.notes
                                                                ? `📝 ${interaction.notes}`
                                                                : 'Без заметок'}
                                                        </Box>
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography component="span">
                                                        <Box display="flex" alignItems="center" color="#777">
                                                            <EventIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                                            {format(new Date(interaction.date), 'dd.MM.yyyy')}
                                                        </Box>
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="middle" sx={{ my: 1 }} />
                                    </Box>
                                ))}
                            </List>
                        )}
                    </Paper>
                </Fade>

                <CreateInteractionModal
                    open={open}
                    onClose={() => {
                        setOpen(false);
                        setEditingInteraction(null);
                    }}
                    client_id={Number(id)}
                    editingInteraction={editingInteraction}
                />
                <DeleteConfirmationModal
                    open={openDeleteDialog}
                    onClose={() => setOpenDeleteDialog(false)}
                    onConfirm={handleDelete}
                />
            </Box>
            <FabButton onAddClick={() => setOpen(true)} onDeleteClick={() => setOpenDeleteDialog(true)} />
        </div>
    );
};
