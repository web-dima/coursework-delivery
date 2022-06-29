import React from 'react';
import roll from "../assets/images/roll-ell-standart.jpg";
import cart from "../assets/images/cart.svg";

interface ProductProps {}

const Product: React.FC<ProductProps> = ({}) => {
    return (
        <div className="product__item">
            <div className="rests__item-bg">
                <img src={roll} alt="" />
            </div>


            <div className="product__item__title">
                Ролл угорь стандарт
            </div>

            <div className="rests__item__desc">
                Рис, угорь, соус унаги, кунжут, водоросли нори.
            </div>

            <div className="rests__item__wrapper">
                <button className="rests__item__card">
                    В корзину
                    <img src={cart} alt="" />
                </button>
                <span className="rests__item-price rests__item-price--restaurant">250 ₽</span>
            </div>
        </div>
    );
};

export default Product;