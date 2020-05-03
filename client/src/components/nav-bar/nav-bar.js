import React from "react";
import './nav-bar.css'

const NavBar = ({onNavElementClick}) => {
    return (
            <ul className="nav nav-pills nav-fill nav-bar">
                <li className="nav-item">
                    <a className="nav-link " onClick={() => onNavElementClick('monoblock')} href="#">Моноблоки</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={() => onNavElementClick('tablet')} href="#">Планшеты</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={() => onNavElementClick('laptop')} href="#">Ноутбуки</a>
                </li>
            </ul>


    )
};
export default NavBar;
