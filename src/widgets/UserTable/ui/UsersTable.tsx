import { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';

import { DeleteUserConfirmationModal } from '@/widgets/DeleteUserConfirmationModal';
import { User } from '@/entities/User/types.ts';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetMeQuery,
} from '@/features/users/model/userApi.ts';
import { SkeletonUserTable } from '@/widgets/SkeletonUserTable';

export const UsersTable = () => {
  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const { data: me } = useGetMeQuery();

  const [open, setOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('full_name');

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedUsers = useMemo(() => {
    const getValue = (user: User) => user[orderBy as keyof User] ?? '';
    return users.slice().sort((a, b) => {
      const aVal = getValue(a).toString();
      const bVal = getValue(b).toString();
      return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
  }, [order, orderBy, users]);

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

  if (isLoading) return <SkeletonUserTable />;

  if (isError) return <div>Ошибка: Не удалось загрузить пользователей</div>;

  return (
    <Stack
      spacing={3}
      alignItems="center"
      sx={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: 3 }}
    >
      <DeleteUserConfirmationModal
        open={open}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDelete}
      />
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: 2, width: '100%', overflowX: 'auto' }}
      >
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
                  {me?.id !== user.id ? (
                    <IconButton color="error" onClick={() => handleOpenDeleteModal(user.id)}>
                      <Delete />
                    </IconButton>
                  ) : (
                    <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                      Это вы
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
