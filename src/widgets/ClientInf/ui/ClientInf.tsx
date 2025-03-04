import {CircularProgress, Typography} from "@mui/material";
import {useParams} from "react-router";
import {useAppDispatch, useAppSelector} from "@/shared/lib/hooks/reduxHooks.ts";
import {useEffect} from "react";
import {getClientsById} from "@/features/clients/model/clientSlice.ts";

export const ClientInf = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const {currentClient, status, error} = useAppSelector(state => state.clients)
    useEffect(() => {
        dispatch(getClientsById({ id: Number(id) }))
    }, [dispatch, id]);

    if (status === "loading") return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
    if (!currentClient) return <Typography>Клиент не найден</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <>
            <Typography variant="h4" fontWeight="bold">{currentClient.name}</Typography>
            <Typography>📌 Контактное лицо: {currentClient.contact_person}</Typography>
            <Typography>📞 Телефон: {currentClient.phone}</Typography>
            <Typography>✉ Email: {currentClient.email}</Typography>
            <Typography>🏠 Адрес: {currentClient.address}</Typography>
            <Typography> Индустрия: {currentClient.industry}</Typography>
        </>
    );
};
