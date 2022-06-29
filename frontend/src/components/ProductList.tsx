import React from 'react';
import Product from "./Product";

const ProductList: React.FC = () => {
    return (
        <div className="rests__items">
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>

        </div>
    );
};

export default ProductList;