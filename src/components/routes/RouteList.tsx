import React from "react";
import { Navigate } from "react-router-dom";
import { SimpleLayout } from "dhis2-semis-components";
import AppsConfiguration from "../../pages/AppsConfiguration";

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
        }
    ]
}
