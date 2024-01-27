import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { pokemonsTypes } from "../../../../../../constants/typesPokemons";
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { PokemonType } from "../../../../../../types/pokemon";


type SelectFieldProps = {
    storagePokemons: PokemonType[]
}


export default function SelectField(props: SelectFieldProps) {
    const { storagePokemons } = props

    const [value, setValue] = useState('0');

    const getTypePokemon = async (id: string): Promise<PokemonType[]> => {
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


    const client = useQueryClient()


    const { data, isFetching } = useQuery({ queryKey: ['types', value], queryFn: () => getTypePokemon(value), enabled: value !== '0' ? true : false })


    useEffect(() => {
        if (data && value !== '0') {
            client.setQueryData(['pokemons'], data)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, value])

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const typepokemonValue = e.target.value
        setValue(typepokemonValue)

        if (typepokemonValue === '0') {
            client.setQueryData(['pokemons'], storagePokemons)
        }
    }

    if (isFetching) {
        return <div>...</div>
    }

    return (
        <select className="bg-white h-full p-3 w-[300px] outline-none rounded-lg text-[#A9A3AF]" onChange={handleChange} value={value}>
            {
                pokemonsTypes.map((typePokemon) => <option className="text-base text-zinc-500" value={typePokemon.id} key={typePokemon.id}>{typePokemon.name}</option>)
            }
        </select>
    )

}