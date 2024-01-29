
type ListItemProps = {
    title: string;
    text: string | undefined;
}

export default function ListItem(props: ListItemProps) {
    const { title, text } = props
    return (
        <li className='italic flex flex-col'>
            <span className='font-medium font-lg '>{title}</span>
            <span className='text-base'>{text}</span>
        </li>
    )
}