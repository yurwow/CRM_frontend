import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Chip,
    Divider,
} from '@mui/material';
import { format } from 'date-fns';
import { IInteraction } from '@/entities/Interactions/types.ts';
import EventIcon from '@mui/icons-material/Event';

interface InteractionDetailModalProps {
    open: boolean;
    onClose: () => void;
    interaction: IInteraction | null;
}

export const InteractionDetailModal = ({
    open,
    onClose,
    interaction,
}: InteractionDetailModalProps) => {
    if (!interaction) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle
                sx={{
                    borderBottom: '1px solid #eee',
                    bgcolor: '#f7f9ff',
                }}
            >
                Детали взаимодействия
            </DialogTitle>
            <DialogContent sx={{ py: 3 }}>
                <Box sx={{ mb: 1, mt: 1 }}>
                    <Chip
                        label={interaction.type}
                        color="secondary"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            px: 2,
                            py: 0.75,
                            mb: 2,
                        }}
                    />
                </Box>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold" color="#555">
                        Дата:
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <EventIcon sx={{ mr: 1, color: '#666' }} />
                        <Typography>{format(new Date(interaction.date), 'dd.MM.yyyy')}</Typography>
                    </Box>
                </Box>

                {interaction.createdAt && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" fontWeight="bold" color="#555">
                            Дата создания:
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <EventIcon sx={{ mr: 1, color: '#666' }} />
                            <Typography>
                                {format(new Date(interaction.createdAt), 'dd.MM.yyyy')}
                            </Typography>
                        </Box>
                    </Box>
                )}

                {interaction.updatedAt && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" fontWeight="bold" color="#555">
                            Последнее изменение:
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <EventIcon sx={{ mr: 1, color: '#666' }} />
                            <Typography>
                                {format(new Date(interaction.updatedAt), 'dd.MM.yyyy')}
                            </Typography>
                        </Box>
                    </Box>
                )}

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" color="#555">
                        Заметки:
                    </Typography>
                    <Typography
                        sx={{
                            p: 2,
                            bgcolor: '#f9f9f9',
                            borderRadius: 1,
                            minHeight: '100px',
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {interaction.notes || 'Нет заметок'}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
};
