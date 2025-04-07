import { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Stack, TableSortLabel,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';

import { DeleteUserConfirmationModal } from '@/widgets/DeleteUserConfirmationModal';
import { User } from '@/entities/User/types.ts';
import { useGetUsersQuery, useDeleteUserMutation } from '@/features/users/model/userApi.ts';
import { SkeletonUserTable } from '@/widgets/SkeletonUserTable';

export const UsersTable = () => {
    const { data: users = [], isLoading, isError } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();

    const [open, setOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<string>('full_name');

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedUsers = users.slice().sort((a, b) => {
        const getValue = (user: User) => user[orderBy as keyof User] ?? '';
        const aVal = getValue(a).toString();
        const bVal = getValue(b).toString();
        return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });

    const handleDelete = async () => {
        if (userIdToDelete !== null) {
            try {
                await deleteUser(userIdToDelete).unwrap();
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

    if (isLoading) return <SkeletonUserTable/>

    if (isError) return <div>Ошибка: Не удалось загрузить пользователей</div>;

    return (
        <Stack spacing={3} alignItems="center" sx={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: 3 }}>
            <DeleteUserConfirmationModal open={open} onClose={handleCloseDeleteModal} onConfirm={handleDelete} />
            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, width: '100%', overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {['full_name', 'email', 'role'].map((col) => (
                                <TableCell key={col}>
                                    <TableSortLabel
                                        active={orderBy === col}
                                        direction={orderBy === col ? order : 'asc'}
                                        onClick={() => handleRequestSort(col)}
                                    >
                                        {col === 'full_name' ? 'Имя' : col === 'email' ? 'Email' : 'Роль'}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
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
