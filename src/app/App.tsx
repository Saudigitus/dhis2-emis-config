import React from 'react'
import "./App.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-select/dist/react-select.css";
import { Router } from "../components/routes"
import "../assets/style/globalStyle.css"
import getInitDataStore from '../hooks/commons/useInitDataStore';

function App() {
    const { isInitialized } = getInitDataStore()

    if (!isInitialized) {
        return <></>
    }

    return (
        <>
            <Router />
        </>
    )
}
export default App
