import {Suspense} from "react";
import {LoginPage} from "@/pages/LoginPage";
import {Loader} from "@/widgets/Loader";
import {Route, Routes} from "react-router";
import HomePage from "@/pages/HomePage/ui/HomePage.tsx";
import {PrivateRouter} from "@/app/providers/PrivateRouter";


export const RouterProvider = () => {
    return (
        <Suspense fallback={<Loader width="100vw" height="100vh" />}>
           <Routes>
               <Route path='/login' element={<LoginPage/>} />
               <Route element={<PrivateRouter/>}>
                   <Route path='/' element={<HomePage/>} />
               </Route>
               <Route path="*" element={<h1>404 Not Found</h1>} />
           </Routes>
        </Suspense>
    )
}
