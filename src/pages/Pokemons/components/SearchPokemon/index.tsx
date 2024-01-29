import { PokemonType } from "../../../../types/pokemon"
import Logo from '../../../../assets/img/pokemon-logo.png'
import FormField from "./components/FormField"
import Filters from "./components/Filters"


type SearchPokemonProps = {
  AllPokemonsRef: React.MutableRefObject<PokemonType[]> 
  filterPokemonsRef: React.MutableRefObject<PokemonType[]> 
}


export default function SearchPokemon(props: SearchPokemonProps) {

  const { AllPokemonsRef, filterPokemonsRef } = props
  
  return (
    <section className='flex justify-center lg:justify-between items-center h-32  py-2 lg:flex-nowrap flex-wrap mb-10'>
      <img src={Logo} alt={Logo} className="h-14"  />
      <div className="flex w-full max-w-2xl justify-center  lg:space-x-5 items-center lg:flex-nowrap flex-wrap flex-col-reverse lg:flex-row  min-[2200px]:px-10 pr-0"> 
      <Filters filterPokemonsRef={filterPokemonsRef}  AllPokemonsRef={AllPokemonsRef}/>
      <FormField filterPokemonsRef={filterPokemonsRef} />
      </div>
    </section>
  )

}