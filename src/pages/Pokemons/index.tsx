import axios from 'axios';
import SearchPokemon from './components/SearchPokemon';
import ImgErro from '../../assets/img/no_image.png'
import { useQuery } from '@tanstack/react-query';
import { Pokedex } from '../../components'
import { PokemonType } from '../../types/pokemon';
import { useRef } from 'react';
import { RotatingSquare } from 'react-loader-spinner';

export default function Pokemons() {

  const filterPokemonsRef = useRef<PokemonType[]>([]) 
  const AllPokemonsRef = useRef<PokemonType[]>([])


  const getAllPokemons = async (): Promise<PokemonType[]> => {
    let endpoints = [];

    for (let i = 1; i <= 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    const pokemonData = await axios.all(
      endpoints.map((endpoint) => axios.get(endpoint))
    );
    const response = pokemonData.map((i) => i.data); 

    AllPokemonsRef.current = response 
    filterPokemonsRef.current = response

    return response
  }

  const { data, isFetching, error, refetch} = useQuery({ queryKey: ['pokemons'], queryFn: getAllPokemons})


  if (isFetching) {

    return (
      <div className='h-screen flex justify-center items-center'>
        <RotatingSquare
          visible={true}
          height="200"
          width="200"
          color="#263238"
          ariaLabel="rotating-square-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    )
  } 


  if (error) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <div className='p-5 rounded flex justify-center flex-col items-center'>
          <img src={ImgErro} alt={ImgErro} className='h-20' />
          <h2 className='text-3xl'>Erro ao buscar os pokemons</h2> 
          <button className='bg-red-500 p-3 rounded mt-3 text-white font-medium' onClick={() => refetch()} type='button'>Tentar Novamente</button>
        </div>
      </div>
    )
  }

  return (
    <section className='px-10'>
      <SearchPokemon filterPokemonsRef={filterPokemonsRef}  AllPokemonsRef={AllPokemonsRef}/>
      <div className='grid  md:grid-cols-2 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-8 mt-28 lg:mt-10 justify-items-center gap-10'>
        {
          data?.map((pokemon) => <Pokedex key={pokemon.id} {...pokemon} />)
        }
      </div>
    </section>
  );


}
