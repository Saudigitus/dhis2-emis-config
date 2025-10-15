import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import AppsConfiguration from '../../pages/AppsConfiguration';

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<Outlet/>} >
                <Route key={'configuration'} path={'/'} element={<AppsConfiguration />} />
            </Route>
        </Routes>
    )
}
