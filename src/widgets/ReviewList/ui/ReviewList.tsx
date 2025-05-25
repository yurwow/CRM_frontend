import { Box, Button, Card, CardContent, Divider, Rating, Typography } from '@mui/material';
import { useDeleteReviewMutation, useGetReviewsByIdQuery } from '@/features/reviews/model/reviewApi.ts';
import { useParams } from 'react-router';
import { useState } from 'react';
import { DeleteConfirmationModal } from '@/widgets/DeleteConfirmationModal';
import { useGetMeQuery } from '@/features/users/model/userApi.ts';
import { toast } from 'react-toastify';

export const ReviewList = () => {
    const { id } = useParams();
    const contractorId = Number(id);
    const { data: reviews } = useGetReviewsByIdQuery(contractorId);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
    const [deleteReview] = useDeleteReviewMutation();
    const { data: me } = useGetMeQuery();

    const handleOpenDeleteModal = (id: number) => {
        setSelectedReviewId(id);
        setOpenModal(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedReviewId !== null) {
            try {
                await deleteReview(selectedReviewId).unwrap();
                toast.success('Отзыв успешно удален!');
            } catch (error) {
                console.error('Ошибка при удалении отзыва:', error);
                toast.error('Ошибка при удалении отзыва!');
            } finally {
                setOpenModal(false);
                setSelectedReviewId(null);
            }
        }
    };

    return (
        <>
            <DeleteConfirmationModal text="отзыв" onConfirm={handleConfirmDelete} onClose={() => setOpenModal(false)} open={openModal} />
            <Box>
                <Typography variant="h5" gutterBottom>
                    Отзывы
                </Typography>
                {reviews && reviews.length > 0 ? (
                    reviews.map((review) => (
                        <Card key={review.id} sx={{ mb: 2 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {review.author.full_name || 'Аноним'}, {new Date(review.created_at).toLocaleDateString()}
                                    </Typography>

                                    {me?.role === 'admin' && (
                                        <Button size="small" color="error" onClick={() => handleOpenDeleteModal(review.id)}>
                                            Удалить
                                        </Button>
                                    )}
                                </Box>

                                <Rating value={review.rating || 0} readOnly />
                                <Divider sx={{ my: 1 }} />
                                <Typography>{review.comment}</Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography color="text.secondary">Пока нет отзывов</Typography>
                )}
            </Box>
        </>
    );
};
