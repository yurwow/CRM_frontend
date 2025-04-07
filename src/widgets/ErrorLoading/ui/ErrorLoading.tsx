import { Alert, Button, Stack } from '@mui/material';
import { getClients } from '@/features/clients/model/clientSlice.ts';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/reduxHooks.ts';

export const ErrorLoading = () => {
    const dispatch = useAppDispatch();
    const { error } = useAppSelector((state) => state.clients);

    console.log(error);
    return (
        <>
            <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ width: '100%', padding: 3 }}>
                <Alert
                    severity="error"
                    action={
                        <Button color="inherit" size="small" onClick={() => dispatch(getClients())}>
                            Повторить
                        </Button>
                    }
                >
                    Ошибка загрузки: {error || 'Что-то пошло не так. Попробуйте позже.'}
                </Alert>
            </Stack>
        </>
    );
};
