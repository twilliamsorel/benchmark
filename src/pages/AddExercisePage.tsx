import { useState } from "react"
import { db } from "../db"
import styled from "styled-components"
import { ExerciseList } from "../components/ExerciseList"
import { MainNav } from "../components/MainNav"

const ExerciseForm = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 24px 12px 24px;
  border-bottom: 1px solid #d2d2d2;

  input[type="text"] {
    padding: 12px; 
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid gray;
  }
  
  button {
    padding: 12px; 
    font-size: 18px;
    border-radius: 12px;
    border: 1px solid gray;
  }
`

export function AddExercisePage() {
  const [name, setName] = useState("")
  const [status, setStatus] = useState("")

  async function addExercise() {
    if (name.length === 0) {
      setStatus('Exercise name must be at least one character long')
      return
    }

    try {
      const id = await db.exercises.add({
        name,
      })

      setStatus(`Exercise ${name} successfully added. Assigned id ${id}`)
      setName("")
    } catch (error) {
      setStatus(`Failed to add ${name}: ${error}`)
    }
  }

  return (
    <>
      <header><h1>Add Exercise</h1></header>
      <ExerciseForm>
        {status.length > 0 && (<p className="status">{status}</p>)}
        <label>Exercise name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addExercise}>add exercise</button>
      </ExerciseForm>
      <ExerciseList />
      <MainNav />
    </>
  )
}
