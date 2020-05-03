import React from "react";
import './product-list.css'

const ProductList = ({products, Product, isAuthorised}) => {
    products = Array.from(products);
    const productList = products.map((el) => <li>
        <Product {...el}/>
    </li>);
    return productList;
};

export default ProductList;
