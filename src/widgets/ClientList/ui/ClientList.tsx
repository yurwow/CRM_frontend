import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks.ts";
import { getClients } from "@/features/clients/model/clientSlice.ts";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Stack, TextField, TableSortLabel, IconButton
} from "@mui/material";
import { useNavigate } from "react-router";
import {Visibility} from "@mui/icons-material";
import {IClient} from "@/entities/Client/types.ts";

export const ClientList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { clients, status, error } = useAppSelector((state) => state.clients);
    const [searchTerm, setSearchTerm] = useState("");
    const [orderBy, setOrderBy] = useState<keyof IClient>("name");
    const [order, setOrder] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        dispatch(getClients());
    }, [dispatch]);

    const handleSort = (property: keyof IClient) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };


    const filteredClients = useMemo<IClient[]>(() => {
        return clients
            .filter(client =>
                Object.values(client).some(value =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchTerm.toLowerCase())
                )
            )
            .sort((a, b) => {
                const aValue = a[orderBy] ?? "";
                const bValue = b[orderBy] ?? "";

                if (aValue < bValue) return order === "asc" ? -1 : 1;
                if (aValue > bValue) return order === "asc" ? 1 : -1;
                return 0;
            });
    }, [clients, searchTerm, orderBy, order]);


    if (status === "loading") return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
    if (status === "failed") return <Typography color="error">Ошибка загрузки: {error}</Typography>;

    return (
        <Stack spacing={3} alignItems="center" sx={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: 3 }}>
            <TextField
                label="Поиск"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, width: "100%", overflowX: "hidden" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {[
                                { label: "Название", field: "name" },
                                { label: "Контактное лицо", field: "contact_person" },
                                { label: "Телефон", field: "phone" },
                                { label: "Email", field: "email" },
                                { label: "Адрес", field: "address" },
                                { label: "Индустрия", field: "industry" }
                            ].map(({ label, field }) => (
                                <TableCell key={field}>
                                    <TableSortLabel
                                        active={orderBy === field}
                                        direction={orderBy === field ? order : "asc"}
                                        onClick={() => handleSort(field as keyof IClient)}
                                    >
                                        {label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredClients.length > 0 ? (
                            filteredClients.map((client) => (
                                <TableRow key={client.id} hover>
                                    <TableCell>{client.name}</TableCell>
                                    <TableCell>{client.contact_person}</TableCell>
                                    <TableCell>{client.phone}</TableCell>
                                    <TableCell>{client.email}</TableCell>
                                    <TableCell>{client.address}</TableCell>
                                    <TableCell>{client.industry}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => navigate(`/clients/${client.id}`)}>
                                            <Visibility />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">Нет данных</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};
