import React, { ChangeEvent } from "react";
import "./styles.css";
import Logo from "../../assets/img/pokemon-logo.png";

type PropsNavabr = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  pokemonValue: string;
};

const Navbar: React.FC<PropsNavabr> = ({ handleChange, pokemonValue }) => {
  return (
    <nav className="c-navbar">
      <img src={Logo} alt={Logo} />
      <div>
        <input onChange={handleChange} value={pokemonValue} />
        <i className="fas fa-search"></i>
      </div>
    </nav>
  );
};

export default Navbar;
