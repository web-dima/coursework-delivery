import React from 'react';
import banner from "../assets/images/header-bg.png";

const Banner: React.FC = () => {

    return (
        <section className="header2">
            <div className="container">
                <div className="header2__forbg" style={{backgroundImage: `url(${banner})`}}>
                    <div className="header2__content__wrapper">
                        <div className="header2__title">
                            Онлайн-сервис<br />доставки еды на дом
                        </div>
                        <div className="header2__text">
                            Блюда из любимого ресторана привезет курьер в перчатках, маске и с антисептиком
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;