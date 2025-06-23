import { Navigate } from "react-router-dom";
import React from "react";
import {SimpleLayout } from "../../layout"
import AppsConfiguration from "../../pages/AppsConfiguration";

export default function RouteList() {
    return [
        {
            path: '/',
            layout: SimpleLayout,
            component: () => <Navigate to="/semis/configuration?sectionType=student" replace />
        },
        {
            path: '/semis/configuration',
            layout: SimpleLayout,
            component: () => <AppsConfiguration />
        }
    ]
}
