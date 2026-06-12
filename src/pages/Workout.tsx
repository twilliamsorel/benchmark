import { useEffect, useState, useRef } from "react";
import { MainNav } from "../components/MainNav";
import styled from "styled-components";
import { db } from "../db";
import type { Exercise } from "../db";
import { SetList } from "../components/SetList";

const DateLabel = styled.label`
  display: block;
  padding: 16px 16px 0;
`

const WorkoutForm = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 24px 12px 24px;
  border-bottom: 1px solid #d2d2d2;

  input[type="search"], input[type="text"] {
    padding: 12px; 
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid gray;
  }

  input[type="search"] {
    margin-bottom: 12px; 
  }

  .entry-container {
    display: flex;
    flex-direction: row;
    column-gap: 12px; 
    align-items: center;
    justify-content: space-between;

    input {
      flex-basis: 85%; 
    }

    button {
      flex-basis: 15%; 
      padding: 12px; 
    }
  }
`

const AutofillList = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      padding: 12px; 
      background: #dcdada;
      border-radius: 4px;
      cursor: pointer;
    }
  }

`

export default function Workout() {
  const fullDate= new Date()
  const date = fullDate.toDateString()
  const [status, setStatus] = useState('')
  const [exercise, setExercise] = useState('')
  const [results, setResults] = useState<Exercise[] | []>([])
  const [entry, setEntry] = useState('')
  const skipSearchRef = useRef(false)

  useEffect(() => {
    if (skipSearchRef.current) {
      skipSearchRef.current = false
      return
    }

    if (!exercise.trim()) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      try {
        const matches = await db.exercises.where('name')
          .startsWithIgnoreCase(exercise.trim())
          .limit(8)
          .toArray()
       
        setResults(matches)
      } catch (error) {
        setStatus(`${error}`)
      } 
    }, 200)

    return () => clearTimeout(timer)
  }, [exercise])

  const handleSelectResult = (exerciseName: string) => {
    skipSearchRef.current = true
    setExercise(exerciseName)
    setResults([])
  }

  const submitLog = async () => {
    const inputs = entry.split('x')
    console.log(inputs)
    if (inputs.length === 3) {

    }   
  
    const sets = parseInt(inputs.length === 3 ? inputs[0] : '1')
    const repetitions = parseInt(inputs.length === 3 ? inputs[1] : inputs[0])
    const weight = parseInt(inputs.length === 3 ? inputs[2].trim().split(' ')[0] : inputs[1].trim().split(' ')[0])
    const measurement = (inputs.length === 3 ? inputs[2].trim().split(' ')[1].includes('lbs') ? 'lbs' : 'kg' : inputs[1].trim().split(' ')[1].includes('lbs') ? 'lbs' : 'kg')

    Array.from({ length: sets }).forEach(async () => {
      try {
        const id = await db.sets.add({
          exercise,
          weight,
          repetitions,
          measurement,
          date
        })

        setEntry('')

        setStatus(`Set(s) successfully added. Assigned id ${id}`)
      } catch (error) {
        setStatus(`Failed to add ${exercise}: ${error}`)
      }
    })
  }

  return (
    <>
      <header><h1>Today's Workout</h1></header>
      <DateLabel>{date}</DateLabel>
      <WorkoutForm>
        {status.length > 0 && (<p className="status">{status}</p>)}
        <label>Exercise name</label>
        <input type="search" 
          placeholder="type to search" 
          value={exercise} 
          onClick={() => setExercise('')}
          onChange={(e) => setExercise(e.currentTarget.value)} />
        {results.length > 0 && (
          <AutofillList>
            <ul>
              {results.map((result) => (
                <li 
                  key={result.id}
                  onClick={() => handleSelectResult(result.name)}>{result.name}</li>  
              ))}
            </ul>
          </AutofillList>
        )}
        <label>Sets entry</label>
        <div className="entry-container">
          <input value={entry} onChange={(e) => setEntry(e.currentTarget.value)} type="text" placeholder="eg: 3 x 5 x 125 lbs" />
          <button onClick={() => submitLog()}>Log</button>
        </div>
      </WorkoutForm>
      <SetList />
      <MainNav />
    </>
  )
}