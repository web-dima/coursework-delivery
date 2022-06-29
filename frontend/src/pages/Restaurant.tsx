import React from 'react';
import star from "../assets/images/star.svg"
import ProductList from "../components/ProductList";
import {useParams} from "react-router-dom";

const Restaurant: React.FC = () => {
    const xui = useParams();
    console.log(xui)
    return (
        <main className="rests">
            <div className="container">
                <div className="rests__header rests__header--restaurant">
                    <div className="rests__header-title">
                        Тянуки
                    </div>
                    <div className="rets__item__rating">
                        <img src={star} alt="" className="rests__item-star" />
                            <span className="rests__item-rating">4.5</span>
                    </div>
                    <div className="rests__item-info">
                        <div className="rests__item-price">
                            От 900 ₽
                        </div>
                        <div className="rests__item-type">
                            · Пицца и суши
                        </div>
                    </div>
                </div>
                <ProductList/>

            </div>
        </main>
    );
};

export default Restaurant;