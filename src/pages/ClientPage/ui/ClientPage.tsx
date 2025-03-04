import { Box } from "@mui/material";
import {InteractionsList} from "@/widgets/Interactions";
import {ClientInf} from "@/widgets/ClientInf";

const ClientPage = () => {
    return (
        <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 3 }}>
            <ClientInf/>
            <InteractionsList/>
        </Box>
    );
};

export default ClientPage;
