import { InteractionsList } from '@/widgets/Interactions';
import { ClientInf } from '@/widgets/ClientInf';
import { Header } from '@/widgets/Header';

const ClientPage = () => {
    return (
        <div>
            <Header />
            <ClientInf />
            <InteractionsList />
        </div>
    );
};

export default ClientPage;
