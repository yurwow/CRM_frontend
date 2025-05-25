import { Box, Button, Rating, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useCreateReviewMutation } from '@/features/reviews/model/reviewApi.ts';
import { useGetMeQuery } from '@/features/users/model/userApi.ts';

interface Props {
    contractorId: number;
}

export const AddReview = ({ contractorId }: Props) => {
    const [newReviewText, setNewReviewText] = useState('');
    const [newRating, setNewRating] = useState<1 | 2 | 3 | 4 | 5 | undefined | null>(null);
    const [createReview] = useCreateReviewMutation();
    const { data: me } = useGetMeQuery();

    const handleAddReview = () => {
        if (!newReviewText.trim() || !newRating || !me) return;
        createReview({
            contractor_id: contractorId,
            author_id: me.id,
            comment: newReviewText,
            rating: newRating,
        });

        setNewReviewText('');
        setNewRating(undefined);
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Добавить отзыв
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
                <TextField fullWidth label="Ваш отзыв" multiline value={newReviewText} onChange={(e) => setNewReviewText(e.target.value)} />
                <Rating name="new-rating" value={newRating} onChange={(_, newValue) => setNewRating(newValue as typeof newRating)} />
                <Button variant="contained" onClick={handleAddReview}>
                    Добавить отзыв
                </Button>
            </Box>
        </Box>
    );
};
