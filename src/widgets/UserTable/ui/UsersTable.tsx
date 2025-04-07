import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Stack, TableSortLabel } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { getUsers, deleteUser } from '@/features/users/model/userSlice.ts';
import { ToastContainer, toast } from 'react-toastify';
import { DeleteUserConfirmationModal } from '@/widgets/DeleteUserConfirmationModal';
import { User } from '@/entities/User/types.ts';
import { useAppSelector } from '@/shared/lib/hooks/reduxHooks.ts';

export const UsersTable = () => {
    const dispatch = useDispatch();
    const { users, status, error } = useAppSelector((state) => state.users);
    const [open, setOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<string>('full_name');

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedUsers = users.slice().sort((a, b) => {
        if (orderBy === 'full_name') {
            if (order === 'asc') return a.full_name.localeCompare(b.full_name);
            return b.full_name.localeCompare(a.full_name);
        }
        if (orderBy === 'email') {
            if (order === 'asc') return a.email.localeCompare(b.email);
            return b.email.localeCompare(a.email);
        }
        if (orderBy === 'role') {
            if (order === 'asc') return a.role.localeCompare(b.role);
            return b.role.localeCompare(a.role);
        }
        return 0;
    });

    const handleDelete = async () => {
        if (userIdToDelete !== null) {
            try {
                await dispatch(deleteUser(userIdToDelete)).unwrap();
                toast.success('Пользователь удалён');
                setOpen(false);
            } catch {
                toast.error('Ошибка при удалении пользователя');
            }
        }
    };

    const handleOpenDeleteModal = (id: number) => {
        setUserIdToDelete(id);
        setOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setOpen(false);
        setUserIdToDelete(null);
    };

    if (status === 'loading') {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <Stack spacing={3} alignItems="center" sx={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: 3 }}>
            <DeleteUserConfirmationModal open={open} onClose={handleCloseDeleteModal} onConfirm={handleDelete} />

            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, width: '100%', overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'full_name'}
                                    direction={orderBy === 'full_name' ? order : 'asc'}
                                    onClick={() => handleRequestSort('full_name')}
                                >
                                    Имя
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'email'}
                                    direction={orderBy === 'email' ? order : 'asc'}
                                    onClick={() => handleRequestSort('email')}
                                >
                                    Email
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'role'}
                                    direction={orderBy === 'role' ? order : 'asc'}
                                    onClick={() => handleRequestSort('role')}
                                >
                                    Роль
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedUsers.map((user: User) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.full_name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <IconButton color="error" onClick={() => handleOpenDeleteModal(user.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ToastContainer />
        </Stack>
    );
};
