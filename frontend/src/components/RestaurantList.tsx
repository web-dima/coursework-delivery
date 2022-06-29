import React from 'react';
import pizzaImg from "../assets/images/pizza-plus.jpg"
import search from "../assets/images/search.svg"
import {IRestaurantItem} from "../types/RestaurantItem";
import RestaurantItem from "./RestaurantItem";




const restaurants: IRestaurantItem[] = [
    {id: "1", img:pizzaImg, minimalPrice: 600, specification: ["русская кухня", "украинская кухня"], timeDelivered: 30, title: "хохолок"},
    {id: "2", img:pizzaImg, minimalPrice: 300, specification: ["грузиская кухня"], timeDelivered: 40, title: "август"},
    {id: "3", img:pizzaImg, minimalPrice: 450, specification: ["японская кухня"], timeDelivered: 20, title: "ацитон"},
    {id: "4", img:pizzaImg, minimalPrice: 900, specification: ["китайская кухня"], timeDelivered: 80, title: "хомбо"},
]

const RestaurantList: React.FC = () => {
    const [searchValue, setSearchValue] = React.useState("")
    const [filteredArray, setFilteredArray] = React.useState(restaurants)

    const onChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchValue(value)
        const arr = restaurants.filter((rest)=> rest.title.includes(value))
        setFilteredArray(arr)
    }

    return (
        <main className="rests">
            <div className="container">
                <div className="rests__header">
                    <div className="rests__header-title">
                        Рестораны
                    </div>

                    <div className="rests__header-input__group">
                        <button className="rests__header-search__btn">
                            <img src={search} alt="" />
                        </button>

                        <input
                            type="text"
                            className="rests__header-input"
                            placeholder="Поиск ресторанов"
                            value={searchValue}
                            onChange={onChangeInputSearch}
                        />
                    </div>
                </div>

                <div className="rests__items">
                    {filteredArray.map((restaurant)=> {
                        return <RestaurantItem
                            key={restaurant.id}
                            id={restaurant.id}
                            title={restaurant.title}
                            timeDelivered={restaurant.timeDelivered}
                            minimalPrice={restaurant.minimalPrice}
                            specification={restaurant.specification}
                            img={restaurant.img}
                        />
                    })}
                </div>
            </div>
        </main>
    );
};

export default RestaurantList;