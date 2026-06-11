import { Dexie, type EntityTable } from "dexie"

interface Exercise {
  id: number
  name: string
}

interface Set {
    id: number
    exercise: string 
    weight: number
    repetitions: number
    measurement: 'lbs' | 'kg'
    date: string 
}

const db = new Dexie("ExerciseDatabase") as Dexie & {
  sets: EntityTable<
    Set,
    "id"
  >
  exercises: EntityTable<
    Exercise,
    "id"
  >
}

// Schema declaration:
db.version(1).stores({
  exercises: "++id, name", 
  sets: "++id, exercise, weight, repetitions, measurements, date", 
})

export type { Exercise, Set }
export { db }