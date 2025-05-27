import { Header } from '@/widgets/Header';
import { CreateUser } from '@/widgets/CreateUser';
import { UsersTable } from '@/widgets/UserTable';
import { useEffect } from 'react';

const AdminPage = () => {
  useEffect(() => {
    document.title = 'Пользователи | Clients CRM';
  }, []);

  return (
    <div>
      <Header />
      <CreateUser />
      <UsersTable />
    </div>
  );
};

export default AdminPage;
