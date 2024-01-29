import { PokemonType } from "../../types/pokemon"
import NoImage from '../../assets/img/no_image.png'
import { Link } from 'react-router-dom'

type PokemonProps = PokemonType

export default function Pokedex(props: PokemonProps) {
   return (
      <div className='bg-white w-52 h-80 rounded-lg flex flex-col justify-between items-center py-5 px-2'>

         <div className="text-center">
            <p className="pb-2 font-bold text-lg text-[#263238]">#{props.id}</p>

            <img
               src={props.sprites.other.dream_world.front_default || NoImage}
               alt={props.sprites.other.dream_world.front_default}
               className="h-36"
            />

            <p className="pt-2 text-base text-[#263238]">{props.name}</p>
         </div>

         <div className="w-full flex items-center justify-center">
            <Link to={'/pokemon/' + props.id} className=" text-white text-base text-center w-36 py-2 translate-x-2 rounded bg-[#263238] font-medium">
               Details
            </Link>
         </div>
      </div>
   )
}