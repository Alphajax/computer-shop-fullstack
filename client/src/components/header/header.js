import React, {useEffect, useState} from "react";
import './header.css';
import LoginForm from "../login-form/login-form";
import RegistrationForm from "../registration-form/registration-form";

const Header = ({isAuthorised, setIsAuthorised, setShowCatalog, showCatalog, toggleShowCart, afterLogout}) => {

    const [ showLoginForm, setShowLoginForm ] = useState(false);
    const [ showRegistrationForm, setShowRegistrationForm ] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

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
        setIsAdmin(false)
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
    }} setIsAdmin={setIsAdmin}/> : null;
    const registrationForm = showRegistrationForm ? <RegistrationForm setVisible = {setShowRegistrationForm}/> : null;

    let buttons = null;

    if(isAuthorised && isAdmin) {
        buttons = (<button className="btn deep-purple lighten-1">
            Заказы
        </button>);
    } else if (isAuthorised && !isAdmin){
        buttons = (
            <>
                <button
                    className="btn  light-green lighten-2"
                    onClick={onMyCartClick}
                    disabled={!showCatalog}
                >
                    Корзина
                </button>
                <button
                    className="btn deep-purple lighten-1"
                    onClick={onCatalogueClick}
                    disabled = {showCatalog}
                >
                    Каталог
                </button>
            </>
        );
    }

    return (
        <header>
            <div className="buttons">
                <button
                    className="btn cyan"
                    onClick={onLoginClick}
                    disabled={isAuthorised}>
                    Вход
                </button>
                <button
                    className="btn red darken-2"
                    onClick={onLogoutClick}
                    disabled = {!isAuthorised}>
                    Выход
                </button>
                <button
                    className="btn purple lighten-2"
                    onClick={onRegistrationClick}
                    disabled={isAuthorised}
                    >
                    Регистрация
                </button>
                {buttons}
            </div>
            {loginForm}
            {registrationForm}
        </header>
    )
};

export default Header;
