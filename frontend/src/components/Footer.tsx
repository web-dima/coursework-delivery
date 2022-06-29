import React from 'react';
import logo from "../assets/images/logo.png"
import inst from "../assets/images/inst.svg"
import fb from "../assets/images/fb.svg"
import vk from "../assets/images/vk.svg"
import {Link} from "react-router-dom";
import {RoutesName} from "../router";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__wrapper">
                    <Link to={RoutesName.MAIN} className="footer__logo">
                        <img src={logo} alt=""/>
                    </Link>
                    <ul className="footer__nav">
                        <li><Link to="">Ресторанам</Link></li>
                        <li><Link to="">Курьерам</Link></li>
                        <li><Link to="">Пресс-центр</Link></li>
                        <li><Link to="">Контакты</Link></li>
                    </ul>
                    <ul className="footer__social">
                        <li><img src={inst} alt="" /></li>
                        <li><img src={fb} alt="" /></li>
                        <li><img src={vk} alt="" /></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;