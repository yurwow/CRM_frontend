import { Header } from '@/widgets/Header';
import { TableContractors } from '@/widgets/TableContractors';
import { CreateContractorModal } from '@/widgets/CreateContractorModal';

const ContractorsPage = () => {
    return (
        <div>
            <Header />
            <TableContractors />
            <CreateContractorModal />
        </div>
    );
};

export default ContractorsPage;
