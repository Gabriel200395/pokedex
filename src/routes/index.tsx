import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Router() {

    const queryClient = new QueryClient({})

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/pokemon' element={<p>Pagina de Detalhes Pokemon</p>} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}