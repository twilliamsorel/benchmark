import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.tsx'
import { AddExercisePage } from './pages/AddExercisePage.tsx'
import Workout from './pages/Workout.tsx'
import ExercisePage from './pages/ExercisePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />    
        <Route path="/workout" element={<Workout />} />    
        <Route path="/add-exercise" element={<AddExercisePage />} />    
        <Route path="/exercise/:name" element={<ExercisePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
