import { Header } from "@/widgets/Header";
import { ClientList } from "@/widgets/ClientList";
import { CreateClientModal } from "@/widgets/CreateClientModal";
import { useState } from "react";
import {AddClientButton} from "@/widgets/AddClientButton";

const HomePage = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Header />
            <ClientList />
            <AddClientButton onClick={() => setOpen(true)}/>
            <CreateClientModal open={open} onClose={() => setOpen(false)} />
        </div>
    );
};

export default HomePage;
