import React from 'react';
import cross from "../assets/images/krest.svg"

const AuthModal: React.FC = () => {
    return (
        <div className="fw auth-show">
            <div className="auth">
                <div className="auth__wrapper">
                    <div className="auth__header">
                        <div className="auth__title">Авторизация</div>

                        <div className="cart__exit">
                            <img src={cross} alt="" />
                        </div>
                    </div>

                    <form className="modal__form">
                        <label className="label__auth">
                            <span>Логин</span>
                            <input type="email" className="login" />
                        </label>

                        <label className="label__auth">
                            <span>Пароль</span>
                            <input type="password" className="password" />
                        </label>
                    </form>

                    <button className="btn__login">Войти</button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;