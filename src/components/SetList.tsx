import { db, type Set } from "../db"
import { useLiveQuery } from "dexie-react-hooks"
import styled from "styled-components"

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 24px 12px;

  li {
    padding: 12px;
    font-size: 18px;
    color: #444;
    border-bottom: 1px solid #d2d2d2;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .date {
      font-size: 14px;
      font-style: italic;
    }

    button {
      padding: 8px 12px; 
    }
  }
`

interface SetListProps {
  exercise?: string
}

export function SetList({exercise}: SetListProps) {
  const date = new Date()
  const sets = (() => {
    if (exercise) {
      return useLiveQuery(() => db.sets.where('exercise').equalsIgnoreCase(exercise).toArray())
    } else {
      return useLiveQuery(() => db.sets.where('date').equals(date.toDateString()).toArray())
    }
  })()

  if (!sets) return

  const deleteSet = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const element = event.currentTarget;
    if (!element) return
    const setId = parseInt(element.dataset.setId ?? '', 10)

    try {
      await db.sets.delete(setId);
      console.log(`User with id ${setId} deleted successfully.`);
    } catch (error) {
      console.error('Failed to delete set:', error);
    }
  }

  return (
    <List>
      {[...sets].reverse().map((set: Set) => (
        <li key={set.id}>
          <span>{set.exercise}</span>
          {exercise && (<span className="date">{set.date}</span>)}
          <span>{`${set.repetitions} x ${set.weight} ${set.measurement}`}</span>
          <button data-set-id={set.id} onClick={(e) => deleteSet(e)}>del</button>
        </li>
      ))}
    </List>
  )
}
