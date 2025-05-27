import { Container } from '@mui/material';
import { Header } from '@/widgets/Header';
import { useParams } from 'react-router';
import { ReviewList } from '@/widgets/ReviewList';
import { CardContractor } from '@/widgets/CardContractor';
import { AddReview } from '@/widgets/AddReview';
import { DeleteContractorButton } from '@/widgets/DeleteContractorButton';
import { useEffect } from 'react';

const ReviewPage = () => {
    const { id } = useParams();
    const contractorId = Number(id);

    useEffect(() => {
        document.title = 'Подрядчик | Clients CRM';
    }, []);

    return (
        <>
            <Header />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <CardContractor contractorId={contractorId} />
                <AddReview contractorId={contractorId} />
                <ReviewList />
            </Container>
            <DeleteContractorButton contractorId={contractorId} />
        </>
    );
};

export default ReviewPage;
