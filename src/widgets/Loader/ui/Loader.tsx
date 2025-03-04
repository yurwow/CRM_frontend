import {Box, CircularProgress} from "@mui/material";
import styles from './Loader.module.css'
interface LoaderProps {
    width?: number;
    height?: number;
}

export const Loader = ({ width, height }: LoaderProps) => {
    return (
        <Box
            className={styles.loaderContainer}
            sx={{
                width: width || '100%',
                height: height || '100vh',
            }}
        >
            <CircularProgress size={100}/>
        </Box>
    );
};
