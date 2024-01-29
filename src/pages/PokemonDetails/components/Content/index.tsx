import { PokemonType } from "../../../../types/pokemon"
import NoImage from '../../../../assets/img/no_image.png'
import ListItem from "./components/ListItem"

type ContentProps = {
    pokemon: PokemonType | undefined
}

export default function Content(props: ContentProps) {
    const { pokemon } = props

    return (
        <div className={`${pokemon?.types[0].type.name} w-[600px] h-[450px] rounded-lg flex flex-col justify-between items-center px-5`}>
            <div className='text-center'>
                <p className='text-4xl mb-4 pt-4 font-bold'>#{pokemon?.id}</p>
                <img className='h-60 mb-4' src={pokemon?.sprites.other.dream_world.front_default || NoImage} alt={pokemon?.sprites.other.dream_world.front_default} />
            </div>

            <ul className='flex w-full justify-between  border-t-[1px] border-white h-20 items-center'>
                <ListItem text={pokemon?.name} title="Name" />
                <ListItem text={pokemon?.height + 'm'} title="Height" />
                <ListItem text={pokemon?.weight + 'Kg'} title="Weight" />
                {
                 pokemon?.types.map((typeItem) => <ListItem text={typeItem.type.name} title="Type" key={typeItem.slot} />)
                }
            </ul>
        </div>

    )


}