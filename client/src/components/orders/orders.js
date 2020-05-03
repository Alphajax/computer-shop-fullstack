import React, {useEffect, useState} from "react";
import "./orders.css"
import {useHttp} from "../../hooks/http.hook";
import Spinner from "../spinner/spinner";

const Orders = () => {
    const {loading, request, error, clearError} = useHttp()
    const [orders, setOrders] = useState(null);

    useEffect(()=> {
        getOrders().then((orders) => setOrders(orders));
    }, []);

    const getOrders = async () =>{
       try{
           const token = localStorage.getItem('token');
           const body = await request('/api/cart/orders', 'GET', null, {
               authorization: token,
               'Content-Type':'application/json'
           });
           return body;
       } catch (e) {
       }

    }

    const parseItems = (items) => {
        let itemsArray = Array.from(items);
        itemsArray = itemsArray.map((i) =>{
            return <li className="collection-item">
                <ul className="collection">
                    <li className="collection-item">Товар - {i.name}</li>
                    <li className="collection-item">Количество - {i.amount}</li>
                </ul>
            </li>
        })
        return <ul className="collection">{itemsArray}</ul>
    }

    if(!orders && loading){
        return <Spinner />
    } else if(orders){
        return <ul className="collection">
            {orders.map((o) => {
                return (<><li>
                    <ul className="collection">
                        <li className="collection-item">Почта: {o.user.email}</li>
                        <li className="collection-item">Телефон: {o.user.phone}</li>
                        <li className="collection-item">Адрес: {o.user.address}</li>
                        <li>Заказы:</li>
                        <li>{parseItems(o.items)}</li>
                    </ul>
                </li>
                </>)
            })}
        </ul>
    } else {
        return null;
    }
}

export default Orders
