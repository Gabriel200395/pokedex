import { ChangeEvent } from "react"
import { useQueryClient } from '@tanstack/react-query'
import { PokemonType } from "../../../../../../types/pokemon";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

type FormFieldProps = {
  filterPokemonsRef: React.MutableRefObject<PokemonType[]> 
}

export default function FormField(props: FormFieldProps) {  
  
  const {filterPokemonsRef} = props

  const client = useQueryClient(); 

  const pokemons = client.getQueryState(['pokemons'])?.data as PokemonType[]

  const { register, handleSubmit, formState: {                                     
    errors
  }, setError } = useForm<{pokemon: string}>()

  const onSubmit = (data:{pokemon: string}) => {
    const filteredPokemon = pokemons.filter((pokemon) => pokemon.name.includes(data.pokemon.toLocaleUpperCase().toLocaleLowerCase())) 
    
    if(!data.pokemon){
      setError('pokemon', {message: 'O campo de buscar não pode ser vazio!'})
    }

    if(!filteredPokemon.length){
      return toast.error('Pokemon não existente!')
    }

    client.setQueryData(['pokemons'], filteredPokemon)
  }
  
  return (
    <form className='sm:max-w-sm  md:max-w-md  lg:max-w-md w-full flex flex-col my-5' onSubmit={handleSubmit(onSubmit)}>

      <div className="flex">
        <input className='bg-white h-12 w-full rounded-l-lg pr-10 pl-4 outline-none' placeholder="Pesquisa por um pokemon" {...register('pokemon', {
          onChange(event: ChangeEvent<HTMLInputElement>) {
            if (event.target.value === '') {
              client.setQueryData(['pokemons'],  filterPokemonsRef.current)
            } 
          },
          onBlur() {
            setError('pokemon', { message: '' })
          }
        })} />
        <button className="bg-[#263238] w-48  rounded-r-lg text-white" type="submit">Buscar</button>
      </div>
      {errors.pokemon?.message && <p className="text-red-400 italic">{errors.pokemon.message}</p>}

    </form>

  )
}