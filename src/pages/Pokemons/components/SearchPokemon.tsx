import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from "@tanstack/react-query"
import { PokemonType } from "../../../types/pokemon" 
import { toast } from 'react-toastify';


export default function SearchPokemon() {

  const queryClient = useQueryClient()


  const validSearchPokemon = z.object({
    pokemon: z.string().min(1, { message: "O campo de buscar e Obrigatorio!" })
  })


  type validSearchPokemonType = z.infer<typeof validSearchPokemon>


  const { register, handleSubmit, formState: {
    errors,
  } } = useForm<validSearchPokemonType>({
    resolver: zodResolver(validSearchPokemon)
  })

  const pokemons = queryClient.getQueryState(['pokemons'])?.data as PokemonType[]

  const onSubmit = (data: validSearchPokemonType) => {

    const filteredPokemon = pokemons.filter((pokemon) => pokemon.name.includes(data.pokemon.toLocaleUpperCase().toLocaleLowerCase()))
     
    if(filteredPokemon.length > 0){
     return queryClient.setQueryData(['pokemons'], filteredPokemon)
    } 
   

  toast.error("Nome por pokemon não encontrado!")

  
  }

  return (
    <section className='w-full flex justify-between items-center px-10 h-32'>

      <div>
        <p className="mb-1 text-base font-medium">Filtrar Por Pokemon:</p>
        <select className="bg-zinc-100 w-64 h-full p-3 outline-none rounded">
          <option className="text-base">
            Selecione
          </option>
          <option className="text-base">
            Pokemon 1
          </option>
          <option className="text-base">
            Pokemon 2
          </option>
          <option className="text-base">
            Pokemon 3
          </option>
          <option className="text-base">
            Pokemon 4
          </option>
        </select>
      </div>



      <form className='flex w-[500px] justify-end' onSubmit={handleSubmit(onSubmit)}>
        <div className='relative w-full'>
          <i className="fas fa-search absolute left-3 top-4 text-xl"></i>
          <input className='bg-zinc-100 h-full w-full rounded-l-lg pl-12 outline-none' {...register('pokemon')} placeholder="Buscar por nome do pokemon" />
          {errors.pokemon && <p className="text-xs italic text-red-500 mt-2">{errors.pokemon.message}</p>}
        </div>
        <button className='bg-[#263238] text-white h-14 rounded-r-lg text-lg w-[200px]' type="submit">Buscar</button>
      </form> 

    </section>
  )

}