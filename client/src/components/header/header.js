import React, {useEffect, useState} from "react";
import './header.css';
import LoginForm from "../login-form/login-form";
import RegistrationForm from "../registration-form/registration-form";

const Header = ({isAuthorised, setIsAuthorised, setShowCatalog, toggleShowCart, afterLogout}) => {

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
                    onClick={onRegistrationClick}>
                    Registration
                </button>
                <button
                    className="btn  light-green lighten-2"
                    onClick={onMyCartClick}
                    disabled={!isAuthorised}
                    >
                    Cart
                </button>
            </div>
            {loginForm}
            {registrationForm}
        </header>
    )
};

export default Header;
