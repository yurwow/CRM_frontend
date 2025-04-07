import { Alert, Button, Stack } from '@mui/material';
import { getClientsById } from '@/features/clients/model/clientSlice.ts';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/reduxHooks.ts';
import { useParams } from 'react-router';

export const ErrorClientLoading = () => {
    const dispatch = useAppDispatch();
    const { error } = useAppSelector((state) => state.clients);
    const { id } = useParams();
    console.log(error);
    return (
        <>
            <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ width: '100%', padding: 3 }}>
                <Alert
                    severity="error"
                    action={
                        <Button color="inherit" size="small" onClick={() => dispatch(getClientsById({ id: Number(id) }))}>
                            Повторить
                        </Button>
                    }
                >
                    Ошибка загрузки: Ошибка получения клиента
                </Alert>
            </Stack>
        </>
    );
};
