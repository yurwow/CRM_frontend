import { Header } from '@/widgets/Header';
import { ClientList } from '@/widgets/ClientList';
import { CreateClientModal } from '@/widgets/CreateClientModal';
import { useEffect } from 'react';

const HomePage = () => {
    useEffect(() => {
        document.title = 'Клиенты | Clients CRM';
    }, []);

    return (
        <div>
            <Header />
            <ClientList />
            <CreateClientModal />
        </div>
    );
};

export default HomePage;
