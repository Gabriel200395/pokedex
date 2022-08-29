import React from "react";
import "./styles.css";

type arrProps = {
  name: string;
  id: number;
  order: number;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
};

type CardProps = {
  pokemons: arrProps[];
};

const Card: React.FC<CardProps> = ({ pokemons }) => {
  console.log(pokemons);
  return (
    <div className="card-container">
      {pokemons?.map((pokemon) => (
        <div className="c-card" key={pokemon.id}>
          <p className="card-pokemon-id">#{pokemon.id}</p>

          <div className="card-img">
            <img
              src={pokemon.sprites.other.dream_world.front_default}
              alt={pokemon.sprites.other.dream_world.front_default}
            />
          </div>

          <p className="card-name">{pokemon.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
