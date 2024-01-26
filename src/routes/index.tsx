import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Pokemons from '../pages/Pokemons'
import PokemonDetails from '../pages/PokemonDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Router() {

    const queryClient = new QueryClient({})

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Pokemons />} />
                    <Route path='/pokemon' element={<PokemonDetails />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}