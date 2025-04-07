import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/reduxHooks.ts';
import { getClients } from '@/features/clients/model/clientSlice.ts';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Stack,
    TextField,
    TableSortLabel,
    IconButton,
    TablePagination,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { Visibility } from '@mui/icons-material';
import { IClient } from '@/entities/Client/types.ts';
import { SkeletonClientsTable } from '@/widgets/SkeletonClientsTable';
import { ErrorLoading } from '@/widgets/ErrorLoading';

export const ClientList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { clients, status } = useAppSelector((state) => state.clients);

    const [searchTerm, setSearchTerm] = useState('');
    const [orderBy, setOrderBy] = useState<keyof IClient>('name');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        dispatch(getClients());
    }, [dispatch]);

    const handleSort = (property: keyof IClient) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const filteredClients = useMemo<IClient[]>(() => {
        return clients.filter((client) =>
            Object.values(client).some(
                (value) =>
                    typeof value === 'string' &&
                    value.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [clients, searchTerm]);

    const sortedClients = useMemo<IClient[]>(() => {
        return [...filteredClients].sort((a, b) => {
            const aValue = a[orderBy] ?? '';
            const bValue = b[orderBy] ?? '';

            if (aValue < bValue) return order === 'asc' ? -1 : 1;
            if (aValue > bValue) return order === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredClients, orderBy, order]);

    const paginatedClients = useMemo<IClient[]>(() => {
        const start = page * rowsPerPage;
        return sortedClients.slice(start, start + rowsPerPage);
    }, [sortedClients, page, rowsPerPage]);

    if (status === 'loading') return <SkeletonClientsTable />;

    if (status === 'failed') return <ErrorLoading/>


    return (
        <Stack spacing={3} alignItems="center" sx={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: 3 }}>
            <TextField
                label="Поиск"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(0);
                }}
            />

            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, width: '100%', overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {[
                                { label: 'Название', field: 'name' },
                                { label: 'Контактное лицо', field: 'contact_person' },
                                { label: 'Телефон', field: 'phone' },
                                { label: 'Email', field: 'email' },
                                { label: 'Адрес', field: 'address' },
                                { label: 'Индустрия', field: 'industry' },
                            ].map(({ label, field }) => (
                                <TableCell key={field}>
                                    <TableSortLabel
                                        active={orderBy === field}
                                        direction={orderBy === field ? order : 'asc'}
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
                        {paginatedClients.length > 0 ? (
                            paginatedClients.map((client) => (
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
                                <TableCell colSpan={7} align="center">
                                    Нет данных
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={filteredClients.length}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
                rowsPerPageOptions={[5, 10, 25, 50]}
                labelRowsPerPage="Строк на странице:"
            />
        </Stack>
    );
};
