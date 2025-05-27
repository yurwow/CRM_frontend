import { Box, Card, CardContent, Skeleton, Stack } from '@mui/material';
import { clientFields } from '@/widgets/ClientInf/constant/clientFields.tsx';

export const SkeletonClientInf = () => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Card
                    sx={{
                        maxWidth: 600,
                        width: '100%',
                        boxShadow: 6,
                        borderRadius: 4,
                        p: 3,
                    }}
                >
                    <CardContent>
                        <Skeleton variant="text" width="80%" height={40} sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 2 }} />
                        {clientFields.map((_, index) => (
                            <Stack
                                key={index}
                                direction="row"
                                alignItems="center"
                                spacing={2}
                                sx={{ p: 1, borderRadius: 2, bgcolor: '#f9f9f9' }}
                            >
                                <Skeleton variant="circular" width={36} height={36} />
                                <Skeleton variant="text" width="60%" />
                            </Stack>
                        ))}
                        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                            <Skeleton variant="rectangular" width={100} height={40} />
                            <Skeleton variant="rectangular" width={100} height={40} />
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};
