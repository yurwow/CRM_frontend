import {useEffect, useMemo, useState} from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks.ts";
import { getClients } from "@/features/clients/model/clientSlice.ts";
import {
    Card, CardContent, Typography, List, ListItem, CircularProgress, Stack, TextField, MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import {useNavigate} from "react-router";

export const ClientList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { clients, status, error } = useAppSelector((state) => state.clients);
    console.log(clients)
    const [searchTerm, setSearchTerm] = useState("");
    const [filterPerson, setFilterPerson] = useState("");

    useEffect(() => {
        dispatch(getClients());
    }, [dispatch]);


    const filteredClients = useMemo(() =>
        clients.filter(client =>
            Object.values(client).some(value =>
                typeof value === "string" &&
                value.toLowerCase().includes(searchTerm.toLowerCase())
            ) &&
            (filterPerson ? client.contact_person === filterPerson : true)
        ), [clients, searchTerm, filterPerson]
    );

    const contactPersons = useMemo(() => (
        [...new Set(clients.map(client => client.contact_person))]
    ), [clients])

    if (status === "loading") return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
    if (status === "failed") return <Typography color="error">Ошибка загрузки: {error}</Typography>;

    return (
        <Stack spacing={3} alignItems="center" sx={{ maxWidth: 600, margin: "0 auto", padding: 3 }}>
            <Typography variant="h4" fontWeight="bold">
                Список клиентов
            </Typography>
            <TextField
                label="Поиск по названию"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FormControl fullWidth>
                <InputLabel>Фильтр по контактному лицу</InputLabel>
                <Select
                    value={filterPerson}
                    onChange={(e) => setFilterPerson(e.target.value)}
                    displayEmpty
                >
                    <MenuItem value="">Все</MenuItem>
                    {contactPersons.map(person => (
                        <MenuItem key={person} value={person}>{person}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {filteredClients.length > 0 ? (
                <List sx={{ width: "100%" }}>
                    {filteredClients.map((client) => (
                        <ListItem key={client.id} sx={{ cursor: "pointer" }}>
                            <Card
                                sx={{ width: "100%", padding: 2, "&:hover": { backgroundColor: "#f5f5f5" } }}
                                onClick={() => navigate(`/clients/${client.id}`)}
                            >
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold">
                                        {client.name}
                                    </Typography>
                                    <Typography>📌 Контактное лицо: {client.contact_person}</Typography>
                                    <Typography>📞 Телефон: {client.phone}</Typography>
                                    <Typography>✉ Email: {client.email}</Typography>
                                    <Typography>🏠 Адрес: {client.address}</Typography>
                                </CardContent>
                            </Card>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography>Нет данных</Typography>
            )}
        </Stack>
    );
};
