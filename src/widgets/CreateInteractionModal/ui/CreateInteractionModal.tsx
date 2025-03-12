import { useAppDispatch } from '@/shared/lib/hooks/reduxHooks.ts';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField } from '@mui/material';
import { addInteractionById, updateInteractionById } from '@/features/interactions/model/interactionsSlice.ts';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const interactionSchema = z.object({
    type: z.string().min(3, 'Минимум 3 символа'),
    notes: z.string().optional(),
    date: z.string().min(1, 'Выберите дату'),
});

interface IProps {
    open: boolean;
    onClose: () => void;
    client_id: number;
    editingInteraction?: { id?: number; type: string; notes?: string; date: string } | null;
}

export const CreateInteractionModal = ({ open, onClose, client_id, editingInteraction }: IProps) => {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(interactionSchema),
    });

    useEffect(() => {
        if (editingInteraction) {
            setValue('type', editingInteraction.type);
            setValue('notes', editingInteraction.notes || '');
            setValue('date', editingInteraction.date.split('T')[0]);
        } else {
            reset({
                type: '',
                notes: '',
                date: '',
            });
        }
    }, [editingInteraction, setValue, reset]);

    const onSubmit = (data: { type: string; notes?: string; date: string }) => {
        try {
            if (editingInteraction) {
                dispatch(
                    updateInteractionById({
                        id: editingInteraction.id,
                        type: data.type,
                        notes: data.notes || '',
                        date: data.date,
                    }),
                );
            } else {
                dispatch(
                    addInteractionById({
                        client_id,
                        type: data.type,
                        notes: data.notes || '',
                        date: data.date,
                    }),
                );
            }
            toast.success('Взаимодействие добавлено');
            onClose();
            reset();
        } catch {
            toast.error('Произошла ошибка при добавлении взаимодействия');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{editingInteraction ? 'Редактировать взаимодействие' : 'Добавить взаимодействие'}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 2 }}>
                    <TextField
                        select
                        label="Тип взаимодействия"
                        fullWidth
                        {...register('type')}
                        error={!!errors.type}
                        helperText={errors.type?.message}
                    >
                        <MenuItem value="Звонок">Звонок</MenuItem>
                        <MenuItem value="Встреча">Встреча</MenuItem>
                        <MenuItem value="Письмо">Письмо</MenuItem>
                        <MenuItem value="Другое">Другое</MenuItem>
                    </TextField>

                    <TextField
                        label="Заметки"
                        fullWidth
                        multiline
                        minRows={3}
                        {...register('notes')}
                        error={!!errors.notes}
                        helperText={errors.notes?.message}
                    />
                    <TextField
                        label="Дата"
                        fullWidth
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        {...register('date')}
                        error={!!errors.date}
                        helperText={errors.date?.message}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">
                    Отмена
                </Button>
                <Button onClick={handleSubmit(onSubmit)} variant="contained">
                    {editingInteraction ? 'Сохранить' : 'Добавить'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
