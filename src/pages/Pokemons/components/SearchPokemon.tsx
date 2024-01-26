export default function SearchPokemon() {
  return (
    <section className='w-full flex justify-between items-center px-10 h-32'>

      <div>
        <p className="mb-1 text-base font-medium">Filtrar Por Pokemon:</p>
        <select className="bg-zinc-100 w-64 h-full p-3 outline-none rounded">
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