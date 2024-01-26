import { Navbar, Pokedex } from '../../components'
import SearchPokemon from './components/SearchPokemon';



export default function Pokemons() {

  return (
    <>
      <Navbar />
      <SearchPokemon />

      <div className='px-10 grid grid-cols-5 gap-5 mt-10'>
       <Pokedex />   
      </div> 

    </>
  );


}
