import { Container } from '@mui/material';
import { Header } from '@/widgets/Header';
import { useParams } from 'react-router';
import { ReviewList } from '@/widgets/ReviewList';
import { CardContractor } from '@/widgets/CardContractor';
import { AddReview } from '@/widgets/AddReview';

const ReviewPage = () => {
    const { id } = useParams();
    const contractorId = Number(id);

    return (
        <>
            <Header />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <CardContractor contractorId={contractorId} />
                <AddReview contractorId={contractorId} />
                <ReviewList />
            </Container>
        </>
    );
};

export default ReviewPage;
