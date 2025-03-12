import { InteractionsList } from '@/widgets/Interactions';
import { ClientInf } from '@/widgets/ClientInf';
import { Header } from '@/widgets/Header';
import { ToastContainer } from 'react-toastify';

const ClientPage = () => {
    return (
        <div>
            <Header />
            <ClientInf />
            <InteractionsList />
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default ClientPage;
