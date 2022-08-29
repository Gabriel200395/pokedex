import React from "react";
import "./styles.css";
import Logo from "../../assets/img/pokemon-logo.png";

const Navbar: React.FC = () => {
  return (
    <nav className="c-navbar">
      <img src={Logo} alt={Logo}/>
      <div>
        <input />
        <i className="fas fa-search"></i>
      </div>
    </nav>
  );
};

export default Navbar;
