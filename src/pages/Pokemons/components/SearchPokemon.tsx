export default function SearchPokemon() {
  return (
    <section className='w-full flex justify-between items-center px-10  h-24'>

        <button className='h-14 w-14'>
          <i className="fas fa-sliders-h text-2xl" />
        </button>
        
        <div className='flex w-[500px] justify-end'>
          <div className='relative w-full'>
            <i className="fas fa-search absolute left-3 top-4 text-xl"></i>
            <input className='bg-zinc-100 h-full w-full rounded-l-lg pl-12 outline-none' />
          </div>
          <button className='bg-[#263238] text-white h-14 rounded-r-lg text-lg w-[200px]'>Buscar</button>
        </div>
      </section>
  )

}