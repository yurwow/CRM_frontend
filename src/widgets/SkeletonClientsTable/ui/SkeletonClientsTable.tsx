import {
    Paper,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';

export const SkeletonClientsTable = () => {
    return (
        <>
            <Stack
                spacing={3}
                alignItems="center"
                sx={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: 3 }}
            >
                <Skeleton variant="rounded" width="100%" height={56} />
                <Paper sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {[
                                    'Название',
                                    'Контактное лицо',
                                    'Телефон',
                                    'Email',
                                    'Адрес',
                                    'Индустрия',
                                    '',
                                ].map((_, index) => (
                                    <TableCell key={index}>
                                        <Skeleton variant="text" width={80} />
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...Array(5)].map((_, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {[...Array(7)].map((_, cellIndex) => (
                                        <TableCell key={cellIndex}>
                                            <Skeleton variant="text" width="100%" height={30} />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Stack>
        </>
    );
};
