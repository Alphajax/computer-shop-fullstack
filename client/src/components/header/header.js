import React, {useEffect, useState} from "react";
import './header.css';
import LoginForm from "../login-form/login-form";
import RegistrationForm from "../registration-form/registration-form";

const Header = ({isAuthorised, setIsAuthorised, setShowCatalog, showCatalog, toggleShowCart, afterLogout}) => {

    const [ showLoginForm, setShowLoginForm ] = useState(false);
    const [ showRegistrationForm, setShowRegistrationForm ] = useState(false);

    const onLoginClick = () => {
        setShowLoginForm((currentShow) => {
            return !currentShow;
        });
    };

    const onRegistrationClick = () => {
      onLogoutClick();
      setShowRegistrationForm((state) => !state);
    };

    const onLogoutClick = () => {
        setIsAuthorised(false);
        localStorage.clear();
        afterLogout();
    };

    const onMyCartClick = () => {
        if(isAuthorised){
          toggleShowCart();
          setShowCatalog((s) => {
              return !s
          })
        }
    }

    const onCatalogueClick = () => {
      toggleShowCart();
      setShowCatalog((s) => {
        return !s
      })
    }

    useEffect(() =>{
        if (showRegistrationForm){
            setShowLoginForm(false)
        }
        if (showLoginForm) {
            setShowRegistrationForm(false);
        }
    } , [showRegistrationForm, showLoginForm]);

    const loginForm = showLoginForm  ? <LoginForm afterLoginAction={ () => {
        onLoginClick();
        setIsAuthorised(true);
    }} /> : null;
    const registrationForm = showRegistrationForm ? <RegistrationForm setVisible = {setShowRegistrationForm}/> : null;
    return (
        <header>
            <div className="buttons">
                <button
                    className="btn cyan"
                    onClick={onLoginClick}
                    disabled={isAuthorised}>
                    LogIn
                </button>
                <button
                    className="btn red darken-2"
                    onClick={onLogoutClick}
                    disabled = {!isAuthorised}>
                    LogOut
                </button>
                <button
                    className="btn purple lighten-2"
                    onClick={onRegistrationClick}
                    disabled={isAuthorised}
                    >
                    Registration
                </button>
                <button
                    className="btn  light-green lighten-2"
                    onClick={onMyCartClick}
                    disabled={!isAuthorised || !showCatalog}
                    >
                    Cart
                </button>
                <button
                    className="btn deep-purple lighten-1"
                    onClick={onCatalogueClick}
                    disabled = {showCatalog}
                  >
                  Catalog
                </button>
            </div>
            {loginForm}
            {registrationForm}
        </header>
    )
};

export default Header;
