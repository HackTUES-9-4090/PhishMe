import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import AuthForm from '../components/AuthForm.component';
import DashBoard from '../pages/DashBoard/DashBoard';
import About from '../pages/About/About';
import { useUserContext } from '../contexts/UserContext';

function Router()
{
    const { accessToken } = useUserContext;

    return (
        <BrowserRouter>
            <Routes>
            {
                !accessToken 
                ? 
                <>
                <Route path = '/sign-in' element = {<AuthForm title={"Sign in"} />} />
                <Route path = '/sign-up' element = {<AuthForm title={"Sign up"} />} />
                </>
                : null
            }
            <Route
                path = '/'
                element = {accessToken ? <DashBoard /> : <About />}
            />
            </Routes>
      </BrowserRouter>
    )
}

export default Router;