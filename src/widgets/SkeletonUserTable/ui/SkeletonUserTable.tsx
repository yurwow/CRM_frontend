import {
    Paper,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

export const SkeletonUserTable = () => {
    return (
        <>
            <Stack
                spacing={3}
                alignItems="center"
                sx={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: 3 }}
            >
                <TableContainer
                    component={Paper}
                    sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        width: '100%',
                        overflowX: 'auto',
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Имя</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Роль</TableCell>
                                <TableCell>Действия</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...Array(5)].map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Skeleton variant="text" width="80%" height={24} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width="90%" height={24} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width="60%" height={24} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="circular" width={32} height={32} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </>
    );
};
