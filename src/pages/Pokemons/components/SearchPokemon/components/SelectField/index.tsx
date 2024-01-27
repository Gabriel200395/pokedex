import { ChangeEvent, useState } from "react";
import { pokemonsTypes } from "../../../../../../constants/typesPokemons";
import { useMutation } from '@tanstack/react-query'
import axios from "axios";

export default function SelectField() {
    const [value, setValue] = useState('0');


    const mutation = useMutation({
        mutationFn: (id: string) => {
            return axios.get(`https://pokeapi.co/api/v2/type/${id}`)
        },
        onSuccess(data) {
            console.log(data)
        }
    })


    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const typepokemonValue = e.target.value
        setValue(typepokemonValue)

        if(typepokemonValue !== '0'){
           mutation.mutate(typepokemonValue)   
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