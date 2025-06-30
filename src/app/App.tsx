import React from 'react'
import "./App.module.css"
import "../assets/style/globalStyle.css"
import { RecoilRoot } from 'recoil';
import { Router } from "../components/routes"
import AppWrapper from './wrapper/AppWrapper';

function App() {

    return (
        <RecoilRoot>
            <AppWrapper>
                <Router />
            </AppWrapper>
        </RecoilRoot>
    )
}

export default App