import { FC, ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { theme } from '../../../../shared/theme/theme';

interface ThemeProviderProps {
    children?: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
