import React from 'react';
import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import CartModal from "../components/CartModal";
import {Outlet} from "react-router-dom"
import AuthModal from "../components/AuthModal";

const MainLayout: React.FC = () => {
    return (
        <>
            <Header/>
            <Banner />
            <Outlet/>
            <CartModal />
            <AuthModal />
            <Footer/>
        </>
    );
};

export default MainLayout;