import { Header } from '@/widgets/Header';
import { TableContractors } from '@/widgets/TableContractors';
import { ToastContainer } from 'react-toastify';
import { CreateContractorModal } from '@/widgets/CreateContractorModal';

const ContractorsPage = () => {
    return (
        <div>
            <Header />
            <TableContractors />
            <CreateContractorModal />
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default ContractorsPage;
