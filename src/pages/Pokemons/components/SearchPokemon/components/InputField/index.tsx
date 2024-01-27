import { ChangeEvent, useState } from "react"
import { useQueryClient } from '@tanstack/react-query'
import { PokemonType } from "../../../../../../types/pokemon";


type InputFieldProps = {
  storagePokemons: PokemonType[]
}

export default function InputField(props: InputFieldProps) {

  const { storagePokemons } = props

  const [value, setValue] = useState('')

  const client = useQueryClient();

  const pokemons = client.getQueryState(['pokemons'])?.data as PokemonType[]

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    const pokemonValue = e.target.value.replace(/\d/g, '')
    const filteredPokemon = pokemons.filter((pokemon) => pokemon.name.includes(e.target.value.toLocaleUpperCase().toLocaleLowerCase()))

    setValue(pokemonValue)

    client.setQueryData(['pokemons'], pokemonValue.length > 0 ? filteredPokemon : storagePokemons)
  }

  return (
    <div className='relative w-[400px]'>
      <i className="fas fa-search absolute  right-3 top-3 text-lg text-[#A9A3AF]" />
      <input className='bg-white h-full w-full rounded-lg pr-10 pl-4 outline-none' placeholder="Pesquisa por um pokemon" onChange={handleChange} value={value} />
    </div>

  )
}