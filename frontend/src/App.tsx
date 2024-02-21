import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Main } from './pages/Main'
import { RecoilRoot } from 'recoil'

export default function App() {
    return (
        <>
            <BrowserRouter>
                <RecoilRoot>
                    <Main></Main>
                </RecoilRoot>
            </BrowserRouter>
        </>
    )
}
