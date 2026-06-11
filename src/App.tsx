import './App.css'
import { ExerciseList } from './components/ExerciseList'
import { MainNav } from './components/MainNav'

function App() {
  return (
    <>
      <header><h1>Benchmark Home</h1></header>
      <ExerciseList />
      <MainNav />
    </>
  )
}

export default App
