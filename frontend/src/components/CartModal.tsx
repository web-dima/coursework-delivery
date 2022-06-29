import React from 'react';
import cross from "../assets/images/krest.svg"

const CartModal: React.FC = () => {
    return (
        <div className="fw">
            <div className="cart">
                <div className="cart__header">
                    <div className="cart__title">
                        Корзина
                    </div>
                    <img src={cross} alt="" className="cart__exit" />
                </div>

                <div className="cart__order-wrapper">
                    <div className="cart__order-inner">
                        <div className="cart__order-name">
                            Заказ 1
                        </div>
                        <div className="cart__order-price">
                            250 р
                        </div>
                        <div className="cart__order__add-remove">
                            <button className="cart__order-remove">-</button>
                            <span className="cart__order-counter">1</span>
                            <button className="cart__order-add">+</button>
                        </div>
                    </div>

                    <div className="cart__order-inner">
                        <div className="cart__order-name">
                            Заказ 1
                        </div>
                        <div className="cart__order-price">
                            250 р
                        </div>
                        <div className="cart__order__add-remove">
                            <button className="cart__order-remove">-</button>
                            <span className="cart__order-counter">1</span>
                            <button className="cart__order-add">+</button>
                        </div>
                    </div>
                </div>

                <div className="cart__footer">
                    <button className="cart__footer__btn-price">1250 ₽</button>
                    <button className="cart__footer__btn-checkout">Офромить заказ</button>
                    <button className="cart__footer__btn-cancel">Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default CartModal;