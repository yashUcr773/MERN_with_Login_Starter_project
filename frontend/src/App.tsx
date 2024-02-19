import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Footer } from './pages/Footer'
import { Header } from './pages/Header'
import { Main } from './pages/Main'

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Header></Header>
                <Main></Main>
                <Footer></Footer>
            </BrowserRouter>
        </>
    )
}
