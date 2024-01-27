import { PokemonType } from "../../types/pokemon"

type PokemonProps = PokemonType

export default function Pokedex(props: PokemonProps) {
   return (
      <div className='bg-zinc-100 w-60 h-80 rounded flex flex-col justify-between items-center py-5 px-2'>

         <div className="text-center">
            <p className="pb-2 font-bold text-lg">#{props.id}</p>

            <img
               src={props.sprites.other.dream_world.front_default}
               alt={props.sprites.other.dream_world.front_default}
               className="h-44"
            />

            <p className="pt-2 text-base">{props.name}</p>
         </div>
       
         <div className="w-full">
         <button className="text-base text-blue-500 flex w-full items-center">
           <span className="pr-3 text-lg">more see details </span> 
           <i className="fas fa-arrow-right text-xs"></i>   
         </button>  
         </div>
         
      </div>
   )
}