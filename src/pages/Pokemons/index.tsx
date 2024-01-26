import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Navbar, Pokedex } from '../../components'
import { PokemonType } from '../../types/pokemon'; 
import SearchPokemon from './components/SearchPokemon';



export default function Pokemons() {

  const getAllPokemon = async (): Promise<PokemonType[]> => {
    let endpoints = [];

    for (let i = 1; i <= 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    const pokemonData = await axios.all(
      endpoints.map((endpoint) => axios.get(endpoint))
    );
    const response = pokemonData.map((i) => i.data);

    return response
  }

  const { data } = useQuery({ queryKey: ['pokemons'], queryFn: getAllPokemon })

  return (
    <>
      <Navbar />
      <SearchPokemon />

      <div className='grid   md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6  mt-10 justify-items-center gap-10 2xl:px-0 px-10'>
         {
          data?.map((pokemon) => { 
            return <Pokedex key={pokemon.id} {...pokemon} />
          })
         }
      </div>

    </>
  );


}
