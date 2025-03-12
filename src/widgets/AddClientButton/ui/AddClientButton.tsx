import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';

interface IProp {
    onClick: () => void;
}

export const AddClientButton = ({ onClick }: IProp) => {
    return (
        <Fab
            color="primary"
            sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                boxShadow: 3,
            }}
            onClick={onClick}
        >
            <AddIcon />
        </Fab>
    );
};
