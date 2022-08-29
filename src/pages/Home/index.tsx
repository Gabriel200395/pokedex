import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";

interface PropsPokenApi {
  name: string;
  id: number;
  order: number;
  sprites: {
    other: {
      dream_world: {
        front_default: string
      }
    }
  }
}

const Home = () => {
  const [pokemonAll, setPokemonAll] = useState<PropsPokenApi[]>([]);

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
      } catch (error) {
        console.log(error);
      }
    }

    pokemonApiAll();
  }, []);

  return (
    <>
      <Navbar />
      <Card pokemons={pokemonAll} />
    </>
  );
};

export default Home;
