import axios from "axios";
import { useEffect, useState, ChangeEvent } from "react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";

interface PropsPokemonApi {
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
}

const Home = () => {
  const [pokemonAll, setPokemonAll] = useState<PropsPokemonApi[]>([]);
  const [pokemonFilter, setPokemonFilter] = useState<PropsPokemonApi[]>([]);

  const [pokemonValue, setPokemonValue] = useState("");

  useEffect(() => {
    async function pokemonApiAll() {
      let endpoints = [];

      for (let i = 1; i <= 50; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
      }
      try {
        const pokemonData = await axios.all(
          endpoints.map((endpoint) => axios.get(endpoint))
        );

        const response = pokemonData.map((i) => i.data);
        setPokemonAll([...pokemonAll, ...response]);
        setPokemonFilter([...pokemonAll, ...response]);
      } catch (error) {
        console.log(error);
      }
    }

    pokemonApiAll();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPokemonValue(e.target.value);
    const pokemon = pokemonAll.filter((pokemon) =>
      pokemon.name
        .toLocaleLowerCase()
        .toLocaleUpperCase()
        .includes(e.target.value.toLocaleLowerCase().toLocaleUpperCase())
    );
    setPokemonFilter(pokemon);
  };

  return (
    <>
      <Navbar handleChange={handleChange} pokemonValue={pokemonValue} />
      <Card pokemons={pokemonFilter} />
    </>
  );
};

export default Home;
