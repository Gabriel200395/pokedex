import { useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { PokemonType } from '../../types/pokemon'
import NoImage from '../../assets/img/no_image.png'  
import logo from '../../assets/img/pokemon-logo.png' 



export default function PokemonDetails() {
    const { id } = useParams<{ id: string }>()

    const client = useQueryClient()

    const pokemons = client.getQueryState(["pokemons"])?.data as PokemonType[]
    const pokemon = pokemons?.find((pokemon) => pokemon.id.toString() === id)


    return (
        <div className='h-screen relative'>
           <Link to={'/'} className='px-10 absolute top-5'>
              <img src={logo} alt={logo} className='h-16'/>
           </Link>

            <div className='w-full h-dvh flex justify-center items-center'>
                <div className={`${pokemon?.types[0].type.name} w-[600px] h-[450px] rounded-lg flex flex-col justify-between items-center px-5`}>
                    <div className='text-center'>
                        <p className='text-4xl mb-4 pt-4 font-bold'>#{pokemon?.id}</p>
                        <img className='h-60 mb-4' src={pokemon?.sprites.other.dream_world.front_default || NoImage} alt={pokemon?.sprites.other.dream_world.front_default} />
                    </div>

                    <ul className='flex w-full justify-between  border-t-[1px] border-white h-20 items-center'>
                        <li className='italic flex flex-col'>
                            <span className='font-medium font-lg '>Name</span>
                            <span className='text-base'>{pokemon?.name}</span>
                        </li>
                        <li className='italic flex flex-col'>
                            <span className='font-medium font-lg '>
                                Height
                            </span>
                            <span className='text-base'>
                                {pokemon?.height}m
                            </span>
                        </li>
                        <li className='italic font-lg flex flex-col'>
                            <span className='font-medium font-lg '>Weight</span>
                            <span className='text-base'> {pokemon?.weight}Kg</span>
                        </li>
                        {
                            pokemon?.types.map((typeItem) =>
                                <li className='italic font-lg flex flex-col' key={typeItem.slot}>
                                    <span className='font-medium font-lg '>Type</span>
                                    <span className='text-base'>{typeItem.type.name}</span>
                                </li>)
                        }

                    </ul>
                </div>
            </div>

        </div>


    )
}