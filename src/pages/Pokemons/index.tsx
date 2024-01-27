import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Pokedex } from '../../components'
import { PokemonType } from '../../types/pokemon';
import SearchPokemon from './components/SearchPokemon';
import { useRef } from 'react';



export default function Pokemons() {
  
  const storagePokemons = useRef<PokemonType[]>([])

  const getAllPokemon = async (): Promise<PokemonType[]> => {
    let endpoints = [];

    for (let i = 1; i <= 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    const pokemonData = await axios.all(
      endpoints.map((endpoint) => axios.get(endpoint))
    );
    const response = pokemonData.map((i) => i.data);
    storagePokemons.current = response
    
    return response
  }

  const { data, isFetching, error, } = useQuery({ queryKey: ['pokemons'], queryFn: getAllPokemon})


  return (
    <>
      <SearchPokemon   storagePokemons={storagePokemons.current}/>

      {
        isFetching && <div>...Carregando</div>
      }

      {
        error && <div>...Error</div>
      }

      <div className='grid  md:grid-cols-2 lg:grid-cols-6 2xl:grid-cols-10  mt-10 justify-items-center gap-10 px-10'>
        {
          data?.map((pokemon) => {
            return <Pokedex key={pokemon.id} {...pokemon} />
          })
        }
      </div>

    </>
  );


}
