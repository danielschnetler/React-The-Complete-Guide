import React from "react";
import investmentlogo from "../assets/investment-calculator-logo.png"

const Header:React.FC = () => {
    return <header id="header">
        <img src={investmentlogo} alt="logo showing money bag"/>
        <h1>Investment Calculator</h1>        
    </header>

}
export default Header;