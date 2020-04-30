import React, {useEffect, useState} from 'react'

import Header from "./components/header/header";
import Catalog from "./components/catalog/catalog";
import Cart from "./components/cart/cart";

const App = () => {

  const [isAuthorised, setIsAuthorised] = useState(false);
  const [showCatalog, setShowCatalog] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [catalog, setCatalog] = useState(<Catalog/>);

  const toggleShowCart = () =>{
    if(showCart){
        setShowCart(false);
    } else {
        setShowCart(true);
    }
  }

  const setToStartPage = () => {
      setShowCatalog(true);
      setShowCart(false);
  }

  useEffect(()=>{
      localStorage.clear();
  },[])

  useEffect(()=>{
      if(!showCatalog){
          setCatalog(null);
      } else {
          setCatalog(<Catalog/>);
      }
  },[showCatalog])

  const cart = showCart ? <Cart/> : null
  return (
      <React.Fragment>
        <Header
            showCatalog = {showCatalog}
            afterLogout = {setToStartPage}
            isAuthorised={isAuthorised}
            setIsAuthorised ={setIsAuthorised}
            setShowCatalog = {setShowCatalog}
            toggleShowCart = {toggleShowCart}/>
          {catalog}
          {cart}
      </React.Fragment>

  )
}

export default App
