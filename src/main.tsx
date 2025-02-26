import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/app/styles/index.css';
import ThemeProvider from '@/app/providers/ThemeProvider';
import App from '@/app/App.tsx';
import {ErrorBoundary} from "@/app/providers/ErrorBoundary";
import {BrowserRouter} from "react-router";
import {AuthProvider} from "@/app/providers/AuthProvider";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <ErrorBoundary>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </ErrorBoundary>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>,
);
