import React from "react";
import getProductFields from "../../creators/getProductFields";
import "./product-in-cart.css"

const ProductInCart = ({productInfo, amount, productType}) => {
    const productFields = getProductFields(productType);
    const url = productInfo.url;
    const paragraphs = [];
    for (let f of productFields) {
        paragraphs.push(<p>{f} : {productInfo[f]}</p>)
    }
    return (
        <div className="wrapper">
            <div className="row">
                <div className="col-3">
                    <img src={url} alt="laptop"/>
                </div>
                <div className="col-4">
                    <h6>{productInfo.name}</h6>
                    {paragraphs}
                </div>
                <div className="col-3">
                    <h5>Price: {productInfo.price} BYN</h5>
                    <h5>Amount: {amount} pts</h5>
                </div>
                <div className="col-2">
                    <button className="waves-effect waves-light btn red lighten-1">DELETE</button>
                </div>
            </div>
        </div>
    )
}

export default ProductInCart;
