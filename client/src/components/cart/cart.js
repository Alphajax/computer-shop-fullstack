import React, {useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import getProductType from "../../creators/getPropductType";
import ProductInCart from "../product-in-cart/product-in-cart";
import Spinner from "../spinner/spinner";
import "./cart.css"

const Cart = () => {
    const {loading, request, error, clearError} = useHttp();
    const [items, setItems] = useState(null);
    const [content, setContent] = useState(null);
    const [fullPrice, setFullPrice] = useState(0);

    const getCartItems = async () => {
        try{
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            const body = await request(`/api/cart/get/${userId}`,'GET',null,{
                authorisation : token
            });
            return body;
        }catch (e) {}
    }

    useEffect( () => {
        getCartItems().then((body) => {
            const {fullArr, fullPrice} = body.fullCart;
            setFullPrice(fullPrice);
            setItems(fullArr);
        }).catch(()=> setItems(null))
    },[fullPrice])

    const onSubmitOrderClick = () => {
        try {
            const token = localStorage.getItem('token');
            const body = request(`api/cart/submit`,'POST', null, {
                authorization: token
            });
        } catch (e) {}
    }

    useEffect(() => {
        if(items) {
            const contentArr = [...items];
            const contentArrModified = contentArr.map((e) => {
                const productType = getProductType(e);
                const productInfo = e[productType];
                return <li>
                    <ProductInCart productInfo = {productInfo} amount = {e.amount} afterDeleteAction={setFullPrice} productType = {productType}/>
                </li>
            })
            setContent(
                <React.Fragment>

                    <div className="container row">
                        <h3>Full Price : {fullPrice}</h3>
                        <button className="btn next-btn" onClick={onSubmitOrderClick}>Подтвердить заказ</button>
                    </div>
                    <ul>{contentArrModified}</ul>
                </React.Fragment>

            )
        } else {
            setContent(<Spinner/>)
        }

    },[items])
    if(content){
        return content;
    } else {
        return(
            <p>Cart</p>
        )
    }

}
export default Cart;
