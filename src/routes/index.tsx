import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Pokemons from '../pages/Pokemons'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Router() {

    const queryClient = new QueryClient({})

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Pokemons />} />
                    <Route path='/pokemon' element={<p>Pagina de Detalhes Pokemon</p>} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}