import { Suspense } from 'react';
import { LoginPage } from '@/pages/LoginPage';
import { Loader } from '@/widgets/Loader';
import { Route, Routes } from 'react-router';
import { PrivateRouter } from '@/app/providers/PrivateRouter';
import { HomePage } from '@/pages/HomePage';
import { ClientPage } from '@/pages/ClientPage';
import { StatisticsPage } from '@/pages/StatisticsPage';
import { NotFoundPage } from '@/pages/404Page';
import { AdminPage } from '@/pages/AdminPage';
import { PrivateAdminRouter } from '@/app/providers/PrivateAdminRouter/ui/PrivateAdminRouter.tsx';
import { ForbiddenPage } from '@/pages/403Page';

export const RouterProvider = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<PrivateAdminRouter />}>
                    <Route path="/admin" element={<AdminPage />} />
                </Route>
                <Route element={<PrivateRouter />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/clients/:id" element={<ClientPage />} />
                    <Route path="/statistics" element={<StatisticsPage />} />
                </Route>
                <Route path="/forbidden" element={<ForbiddenPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};
