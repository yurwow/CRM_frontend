import { useGetContractorsQuery } from '@/features/contractors/model/contractorsApi.ts';
import { useNavigate } from 'react-router';
import { useMemo, useState } from 'react';
import { Contractor } from '@/entities/Contractors/types.ts';
import {
    IconButton,
    Paper,
    Rating,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { getReviewWord } from '@/widgets/TableContractors/helper/reviewWord.ts';

export const TableContractors = () => {
    const { data, isLoading, isError } = useGetContractorsQuery();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [orderBy, setOrderBy] = useState<keyof Contractor>('name');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    console.log(data);

    const handleSort = (property: keyof Contractor) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const filteredContractors = useMemo(() => {
        if (!data) return [];
        return (
            data &&
            data.filter((contractor: Contractor) =>
                Object.values(contractor).some((value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())),
            )
        );
    }, [data, searchTerm]);

    const sortedContractors = useMemo(() => {
        return [...filteredContractors].sort((a, b) => {
            let aValue = a[orderBy] ?? '';
            let bValue = b[orderBy] ?? '';

            if (orderBy === 'average_rating') {
                aValue = parseFloat(aValue as string) || 0;
                bValue = parseFloat(bValue as string) || 0;
            }

            if (aValue < bValue) return order === 'asc' ? -1 : 1;
            if (aValue > bValue) return order === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredContractors, orderBy, order]);

    const paginatedContractors = useMemo(() => {
        const start = page * rowsPerPage;
        return sortedContractors.slice(start, start + rowsPerPage);
    }, [sortedContractors, page, rowsPerPage]);

    if (isLoading) return <Typography>Загрузка...</Typography>;
    if (isError) return <Typography color="error">Ошибка загрузки данных</Typography>;

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
                                { label: 'Специализация', field: 'specialization' },
                                { label: 'Рейтинг', field: 'average_rating' },
                            ].map(({ label, field }) => (
                                <TableCell key={field}>
                                    <TableSortLabel
                                        active={orderBy === field}
                                        direction={orderBy === field ? order : 'asc'}
                                        onClick={() => handleSort(field as keyof Contractor)}
                                    >
                                        {label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedContractors.length > 0 ? (
                            paginatedContractors.map((contractor) => (
                                <TableRow key={contractor.id} hover>
                                    <TableCell>{contractor.name}</TableCell>
                                    <TableCell>{contractor.contact_person}</TableCell>
                                    <TableCell>{contractor.phone}</TableCell>
                                    <TableCell>{contractor.email}</TableCell>
                                    <TableCell>{contractor.address}</TableCell>
                                    <TableCell>{contractor.specialization}</TableCell>
                                    <TableCell>
                                        <Stack direction="column" alignItems="flex-start">
                                            <Tooltip
                                                title={
                                                    contractor.reviews?.length
                                                        ? `${Number(contractor.average_rating).toFixed(2)} на основе ${contractor.reviews.length} ${getReviewWord(contractor.reviews.length)}`
                                                        : 'Нет отзывов'
                                                }
                                                arrow
                                            >
                                                <span>
                                                    <Rating
                                                        name="read-only"
                                                        value={contractor.average_rating ? parseFloat(contractor.average_rating) : 0}
                                                        precision={0.1}
                                                        readOnly
                                                    />
                                                </span>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>

                                    <TableCell>
                                        <IconButton color="primary" onClick={() => navigate(`/contractors/${contractor.id}`)}>
                                            <Visibility />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    Нет данных
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={filteredContractors.length}
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
