import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Footer } from './pages/Footer'
import { Header } from './pages/Header'
import { Main } from './pages/Main'
import { RecoilRoot } from 'recoil'

export default function App() {
    return (
        <>
            <BrowserRouter>
                <RecoilRoot>
                    <Header></Header>
                    <Main></Main>
                    <Footer></Footer>
                </RecoilRoot>
            </BrowserRouter>
        </>
    )
}
