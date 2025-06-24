import { Navigate } from "react-router-dom";
import React from "react";
import {SimpleLayout } from "../../layout"
import AppsConfiguration from "../../pages/AppsConfiguration";
import ConfigurationPage from "../../pages/ConfigurationPage";

export default function RouteList() {
    return [
        {
            path: '/',
            layout: SimpleLayout,
            component: () => <Navigate to="/semis/configuration" replace />
        },
        {
            path: '/semis/configuration',
            layout: SimpleLayout,
            component: () => <AppsConfiguration />
        },
        {
            path: '/semis/configuration/:module',
            layout: SimpleLayout,
            component: () => <ConfigurationPage />
        }
    ]
}
