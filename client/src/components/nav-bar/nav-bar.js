import React from "react";
import './nav-bar.css'

const NavBar = ({onNavElementClick}) => {
    return (
            <ul className="nav nav-pills nav-fill nav-bar">
                <li className="nav-item">
                    <a className="nav-link " onClick={() => onNavElementClick('monoblock')} href="#">Monoblocks</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={() => onNavElementClick('tablet')} href="#">Tablets</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={() => onNavElementClick('laptop')} href="#">Laptops</a>
                </li>
            </ul>


    )
};
export default NavBar;
