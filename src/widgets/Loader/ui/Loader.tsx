import {Box} from "@mui/material";
import styles from "./Loader.module.css"

interface LoaderProps {
    readonly width?: number | string;
    readonly height?: number | string;
}

export const Loader = (props: LoaderProps) => {
    const { width, height } = props;
    return (
        <Box
            className={styles.loaderContainer}
            sx={{
                width: width || '100%',
                height: height || '100%',
            }}
        >
            <Box className={styles.loader} />
        </Box>
    );
};
