import { Header } from '@/widgets/Header';
import { ClientList } from '@/widgets/ClientList';
import { CreateClientModal } from '@/widgets/CreateClientModal';

const HomePage = () => {
    return (
        <div>
            <Header />
            <ClientList />
            <CreateClientModal />
        </div>
    );
};

export default HomePage;
