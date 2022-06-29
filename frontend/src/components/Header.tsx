import React from 'react';
import logo from "../assets/images/logo.png"
import login from "../assets/images/login.svg"
import cart from "../assets/images/cart.svg"
import {Link} from "react-router-dom";
import {RoutesName} from "../router";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <Link to={RoutesName.MAIN} className="ebe">
                        <img src={logo} alt="" className="header__logo" />
                    </Link>

                    <div className="header__buttons">
                        <button className="header__button-sign">
                            <img src={login} alt="" />Войти
                        </button>

                        <button className="header__button-cart">
                            <img src={cart} alt=""/>Корзина
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;