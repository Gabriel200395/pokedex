import React from "react";
import { ColorRing } from "react-loader-spinner";
import "./styles.css";

type ObjPokemon = {
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
  types: [
    {
      slot: number;
      type: {
        name: string;
      };
    }
  ];
};

type CardProps = {
  pokemons: ObjPokemon[];
};

const Card: React.FC<CardProps> = ({ pokemons }) => {
  return (
    <div className="card-container">
      {pokemons.length > 0 ? (
        <>
          {pokemons?.map((pokemon) => (
            <div
              className={`c-card ${pokemon.types[0].type.name}`}
              key={pokemon.id}
            >
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
        </>
      ) : (
        <ColorRing
          visible={true}
          height="400"
          width="100"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#263238", "#263238", "#263238", "#263238", "#263238"]}
        />
      )}
    </div>
  );
};

export default Card;
