import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {toast} from 'react-toastify'
import { pokemonsTypes } from "../../../../../../constants/typesPokemons";
import { PokemonType } from "../../../../../../types/pokemon";

type FiltersProps = {
    filterPokemonsRef: React.MutableRefObject<PokemonType[]> 
    AllPokemonsRef: React.MutableRefObject<PokemonType[]>
}

export default function Filters(props: FiltersProps) {
    const { filterPokemonsRef, AllPokemonsRef } = props

    const [filterPokemonValue, setFilterPokemonValue] = useState('0'); 

    const client = useQueryClient()
   
   const optionsPokemons =  pokemonsTypes.map((typePokemon) => <option className="text-base text-zinc-500" value={typePokemon.id} key={typePokemon.id}>{typePokemon.name}</option>)

    const getPokemons= async (id: string): Promise<PokemonType[]> => {
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
    
    const mutation = useMutation({mutationFn: (id: string) =>  getPokemons(id), 
        onSuccess(data){
            filterPokemonsRef.current = data
            client.setQueryData(['pokemons'], data)  
        }, 
        onError(){ 
          toast.error('Erro ao filtrar pokemon!')
        }
    })

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const pokemonValue = e.target.value
        setFilterPokemonValue(pokemonValue)

        if (pokemonValue === '0') { 
           filterPokemonsRef.current = AllPokemonsRef.current
           return client.setQueryData(['pokemons'], AllPokemonsRef.current)
        } 

        mutation.mutate(pokemonValue)
    } 


    return (
            <select className="bg-white h-full p-3 sm:max-w-sm  md:max-w-md   w-full outline-none rounded-lg text-[#A9A3AF]" onChange={handleChange} value={filterPokemonValue}>
           {optionsPokemons}
        </select>
    )

}