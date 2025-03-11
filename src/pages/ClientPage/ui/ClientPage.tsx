import {InteractionsList} from "@/widgets/Interactions";
import {ClientInf} from "@/widgets/ClientInf";
import {Header} from "@/widgets/Header";

const ClientPage = () => {
    return (
        <>
            <Header/>
            <ClientInf/>
            <InteractionsList/>
        </>
    );
};

export default ClientPage;
