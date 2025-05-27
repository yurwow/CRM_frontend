import { InteractionsList } from '@/widgets/Interactions';
import { ClientInf } from '@/widgets/ClientInf';
import { Header } from '@/widgets/Header';
import { useEffect } from 'react';

const ClientPage = () => {
  useEffect(() => {
    document.title = 'Клиент | Clients CRM';
  }, []);

  return (
    <div>
      <Header />
      <ClientInf />
      <InteractionsList />
    </div>
  );
};

export default ClientPage;
