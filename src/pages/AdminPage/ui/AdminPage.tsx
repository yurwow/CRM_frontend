import { Header } from '@/widgets/Header';
import { CreateUser } from '@/widgets/CreateUser';
import { UsersTable } from '@/widgets/UserTable';

const AdminPage = () => {
    return (
        <div>
            <Header />
            <CreateUser />
            <UsersTable />
        </div>
    );
};

export default AdminPage;
