import {Header} from "@/widgets/Header";
import {ClientList} from "@/widgets/ClientList";
import {Button, Stack} from "@mui/material";
import {CreateClientModal} from "@/widgets/CreateClientModal";
import {useState} from "react";

const HomePage = () => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Header/>
            <Stack spacing={3} alignItems="center">
                <Button variant="contained" onClick={() => setOpen(true)}>
                    + Добавить клиента
                </Button>
                <CreateClientModal open={open} onClose={() => setOpen(false)} />
            </Stack>
            <ClientList/>
        </div>
    );
};

export default HomePage;
