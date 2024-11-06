import { useState } from 'react'
import '../App.scss'
import reactLogo from '../assets/images/react.svg'
import viteLogo from '/vite.svg'
import CounterButton from '../components/CounterButton'
import PlayerTable from '../components/PlayerTable'
import ToDo from '../components/ToDo'  

const players = [
    { id: 1, name: 'John Doe', score: 42 },
    { id: 2, name: 'Jane Doe', score: 43 },
    { id: 3, name: 'Foo Bar', score: 44 },
]

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <CounterButton />
                <PlayerTable players={players} />
                <ToDo />
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/pages/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
