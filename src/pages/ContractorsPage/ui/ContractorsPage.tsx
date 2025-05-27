import { Header } from '@/widgets/Header';
import { TableContractors } from '@/widgets/TableContractors';
import { CreateContractorModal } from '@/widgets/CreateContractorModal';
import { useEffect } from 'react';


const ContractorsPage = () => {

    useEffect(() => {
        document.title = 'Подрядчики | Clients CRM';
    }, []);

    return (
        <div>
            <Header />
            <TableContractors />
            <CreateContractorModal />
        </div>
    );
};

export default ContractorsPage;
