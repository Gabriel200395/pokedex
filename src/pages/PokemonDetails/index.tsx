import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { PokemonType } from '../../types/pokemon'
import logo from '../../assets/img/pokemon-logo.png'
import axios from 'axios'
import { Content } from './components'
import { ThreeDots } from 'react-loader-spinner'
import ImgErro from '../../assets/img/no_image.png'

export default function PokemonDetails() {
    const { id } = useParams<{ id: string }>()

    const getPokemonId = async (id: string | undefined): Promise<PokemonType> => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return response.data
    }

    const { data: pokemon, error, isFetching } = useQuery({ queryKey: ['pokemonId', id], queryFn: () => getPokemonId(id) })

    return (
        <div className='h-screen bg-white flex  justify-center lg:justify-start py-5 w-full relative px-10'>
            <Link to={'/'} className='absolute'>
                <img src={logo} alt={logo} className='h-16' />
            </Link>

            <div className='w-full h-dvh flex justify-center items-center'>

                {
                    error ? (
                        <div className='h-screen flex justify-center items-center'>
                            <div className='p-5 rounded flex justify-center flex-col items-center'>
                                <img src={ImgErro} alt={ImgErro} className='h-20' />
                                <h2 className='text-3xl'>Erro ao buscar pokemon</h2>
                            </div>
                        </div>
                    ) : isFetching ?
                        <ThreeDots
                            visible={true}
                            height="80"
                            width="80"
                            color="#263238"
                            radius="9"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                        : <Content pokemon={pokemon} />
                }

            </div>
        </div>
    )
}