import { Header } from '@/widgets/Header';
import { ClientList } from '@/widgets/ClientList';
import { CreateClientModal } from '@/widgets/CreateClientModal';
import { ToastContainer } from 'react-toastify';

const HomePage = () => {
    return (
        <div>
            <Header />
            <ClientList />
            <CreateClientModal />
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default HomePage;
