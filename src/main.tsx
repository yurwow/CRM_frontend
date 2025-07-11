import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/app/styles/index.css';
import ThemeProvider from '@/app/providers/ThemeProvider';
import App from '@/app/App.tsx';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { BrowserRouter } from 'react-router';
import { StoreProvider } from '@/app/providers/StoreProvider/StoreProvider.tsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <ErrorBoundary>
                    <StoreProvider>
                        <App />
                        <ToastContainer autoClose={3000} />
                    </StoreProvider>
                </ErrorBoundary>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>,
);
