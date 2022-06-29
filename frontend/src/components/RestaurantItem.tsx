import React from 'react';
import {IRestaurantItem} from "../types/RestaurantItem"
import star from "../assets/images/star.svg"
import {Link} from "react-router-dom"

const RestaurantItem: React.FC<IRestaurantItem> = ({
   id,
   title,
   timeDelivered,
   minimalPrice,
   specification,
   img
   }) => {

    return (
        <Link to={`/rest/${id}`} className="rests__item">
            <img src={img} alt="" className="rests__item-bg"/>
            <div className="rests__item__header">
                <div className="rests__item__title">
                    {title}
                </div>
                <button className="rests__item__time">
                    {timeDelivered} мин
                </button>
            </div>
            <div className="rets__item__body">
                <div className="rests__item-type">
                    {specification.join(", ")}
                </div>
            </div>
            <div className="rets__item__footer">
                <div className="rets__item__rating">
                    <img src={star} alt="" className="rests__item-star"/>
                    <span className="rests__item-rating">4.5</span>
                </div>
                <div className="rests__item-info">
                    <div className="rests__item-price">
                        От {minimalPrice} ₽
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default RestaurantItem;