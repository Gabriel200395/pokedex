import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { pokemonsTypes } from "../../../../../../constants/typesPokemons";
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { PokemonType } from "../../../../../../types/pokemon";

type SelectFieldProps = {
    filterPokemonsRef: React.MutableRefObject<PokemonType[]> 
    AllPokemonsRef: React.MutableRefObject<PokemonType[]>
}

export default function Filters(props: SelectFieldProps) {
    const { filterPokemonsRef, AllPokemonsRef } = props

    const [value, setValue] = useState('0'); 

    const client = useQueryClient()

    const getTypesPokemons= async (id: string): Promise<PokemonType[]> => {
        const response = await axios.get<{
            pokemon: {
                pokemon: {
                    name: string;
                    url: string
                }
                slot: number
            }[]
        }>(`https://pokeapi.co/api/v2/type/${id}`)

        const results = await axios.all(response.data.pokemon.map((type) => axios.get(type.pokemon.url)))
        return results.map((result) => result.data)
    }
    
    const { data } = useQuery({ queryKey: ['typesPokemons', value], queryFn: () => getTypesPokemons(value), enabled: value !== '0' ? true : false })

    useEffect(() => {
        if (data && value !== '0') {
            filterPokemonsRef.current = data
            client.setQueryData(['pokemons'], data)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, value])

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const typePokemonValue = e.target.value
        setValue(typePokemonValue)

        if (typePokemonValue === '0') { 
            filterPokemonsRef.current = AllPokemonsRef.current
            client.setQueryData(['pokemons'], AllPokemonsRef.current)
        }
    } 

    return (
        <select className="bg-white h-full p-3 w-[300px] outline-none rounded-lg text-[#A9A3AF]" onChange={handleChange} value={value}>
            {
               pokemonsTypes.map((typePokemon) => <option className="text-base text-zinc-500" value={typePokemon.id} key={typePokemon.id}>{typePokemon.name}</option>)
            }
        </select>
    )

}