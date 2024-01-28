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
    <section className='w-full flex justify-between items-center h-32 px-10'>
      <img src={Logo} alt={Logo} className="h-16" />
      <div className="flex w-full  max-w-[720px]  justify-between "> 
      <Filters filterPokemonsRef={filterPokemonsRef}  AllPokemonsRef={AllPokemonsRef}/>
      <FormField filterPokemonsRef={filterPokemonsRef} />
      </div>
    </section>
  )

}