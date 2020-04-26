import React, {useEffect, useState} from "react";
import './products.css'
import {useHttp} from "../../hooks/http.hook";

const Tablet = ({_id, url, name, price, ram, memory, screen, screenType, screenResolution }) => {
    const {loading, request, error, clearError} = useHttp();
    const [amount, setAmount] = useState(1);

    const onAmountChangeHandler = (e) => {
        setAmount(e.target.value);
    }

    useEffect(()=> {
        if (loading){
            document.body.style.opacity = "0.3";
        } else {
            document.body.style.opacity = "1";
        }
    },[loading])


    const onAddToCartClick = async () => {
        try {
            const token = localStorage.getItem('token')
            const data = await request(`/api/cart/add/${_id}/tablet/${amount}`, 'POST',null, {
                'authorisation' : token
            });
        } catch (e) {
        } finally {
            setAmount(1);
        }
    }
    const button = !localStorage.getItem('isAuthorised') ? null : (<div className="col-2">
        <button className="btn btn-info add" onClick={onAddToCartClick}>Add To Cart</button>
    </div>);

    return (
        <div className="wrapper">
            <div className="row">
                <div className="col-3">
                    <img src={url} alt="laptop"/>
                </div>
                <div className="col-4">
                    <h6>{name}</h6>
                    <p>Memory: {memory}</p>
                    <p>RAM: {ram*1024} МБ</p>
                    <p>Screen size {screen}"</p>
                    <p>Screen type: {screenType}</p>
                    <p>Screen Resolution {screenResolution}</p>
                </div>
                <div className="col-3">
                    <h4>Price: {price} BYN</h4>
                </div>
                <div className="col-2">
                    <input
                        className="product-amount-input"
                        type="number"
                        value={amount}
                        min={"1"}
                        onChange={onAmountChangeHandler}
                        name={"amount"} />
                    {button}
                </div>

            </div>
        </div>
    )
};

export default Tablet;
