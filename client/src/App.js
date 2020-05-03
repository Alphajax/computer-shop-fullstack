import React, {useEffect, useState} from 'react'

import Header from "./components/header/header";
import Catalog from "./components/catalog/catalog";
import Cart from "./components/cart/cart";
import Orders from "./components/orders/orders";

const App = () => {

  const [isAuthorised, setIsAuthorised] = useState(false);
  const [showCatalog, setShowCatalog] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [catalog, setCatalog] = useState(<Catalog/>);

  const toggleShowCart = () => {
    if(showCart){
        setShowCart(false);
    } else {
        setShowCart(true);
    }
  }

  const toggleShowOrders = () => {
    if(showOrders){
        setShowOrders(false);
        setToStartPage();
    } else {
        setShowCatalog(false);
        setShowOrders(true);
    }
  }

  const setToStartPage = () => {
      setShowCatalog(true);
      setShowCart(false);
      setShowOrders(false);
  }

  useEffect(()=>{
      localStorage.clear();
  },[])

  useEffect(()=>{
      if(!showCatalog){
          setCatalog(null);
      } else {
          setCatalog(<Catalog isAuthorised={isAuthorised}/>);
      }
  },[showCatalog])

  const cart = showCart ? <Cart/> : null
  const orders = showOrders ? <Orders/> : null
  return (
      <React.Fragment>
        <Header
            showCatalog = {showCatalog}
            afterLogout = {setToStartPage}
            isAuthorised={isAuthorised}
            setIsAuthorised ={setIsAuthorised}
            setShowCatalog = {setShowCatalog}
            toggleShowCart = {toggleShowCart}
            toggleShowOrders = {toggleShowOrders}/>
          {orders}
          {catalog}
          {cart}
      </React.Fragment>

  )
}

export default App
