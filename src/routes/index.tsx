import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Pokemons from '../pages/Pokemons'
import PokemonDetails from '../pages/PokemonDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'  
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Router() {

    const queryClient = new QueryClient({})

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Pokemons />} />
                    <Route path='/pokemon' element={<PokemonDetails />} />
                </Routes>
                <ToastContainer />
            </BrowserRouter> 
        </QueryClientProvider>
    )
}