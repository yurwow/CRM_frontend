import { Header } from '@/widgets/Header';
import { ToastContainer } from 'react-toastify';
import { CreateUser } from '@/widgets/CreateUser';
import { UsersTable } from '@/widgets/UserTable';

const AdminPage = () => {
    return (
        <div>
            <Header />
            <CreateUser />
            <UsersTable />
            <ToastContainer />
        </div>
    );
};

export default AdminPage;
