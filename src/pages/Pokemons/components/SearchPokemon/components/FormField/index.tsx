import { ChangeEvent } from "react"
import { useQueryClient } from '@tanstack/react-query'
import { PokemonType } from "../../../../../../types/pokemon";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type FormFieldProps = {
  storagePokemons: PokemonType[] 
}

export default function FormField(props: FormFieldProps) {

  const { storagePokemons } = props

  const client = useQueryClient();

  const pokemons = client.getQueryState(['pokemons'])?.data as PokemonType[]

  type pokemonFiltersSchemaType = z.infer<typeof pokemonFiltersSchema>


  const pokemonFiltersSchema = z.object({
    pokemon: z.string().min(1, { message: 'Esse campo e obrigatorio!' })
  })

  const { register, handleSubmit, formState: {
    errors
  }, setError } = useForm<pokemonFiltersSchemaType>({
    resolver: zodResolver(pokemonFiltersSchema)
  })

  const onSubmit = (data: pokemonFiltersSchemaType) => {
    const filteredPokemon = pokemons.filter((pokemon) => pokemon.name.includes(data.pokemon.toLocaleUpperCase().toLocaleLowerCase()))
    client.setQueryData(['pokemons'], filteredPokemon)
  }

  return (
    <form className='w-[400px] flex flex-col' onSubmit={handleSubmit(onSubmit)}>

      <div className="flex">
        <input className='bg-white h-12 w-full rounded-l-lg pr-10 pl-4 outline-none' placeholder="Pesquisa por um pokemon" {...register('pokemon', {
          onChange(event: ChangeEvent<HTMLInputElement>) {
            if (event.target.value === '') {
              client.setQueryData(['pokemons'], storagePokemons)
            }
          },
          onBlur() {
            setError('pokemon', { message: '' })
          }
        })} />
        <button className="bg-[#263238] w-48 rounded-r-lg text-white" type="submit">Buscar</button>
      </div>
      {errors.pokemon?.message && <p className="text-red-400 italic">{errors.pokemon.message}</p>}

    </form>

  )
}