import { db } from "../db"
import { useLiveQuery } from "dexie-react-hooks"
import styled from "styled-components"
import { useLocation, useNavigate} from "react-router"

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 24px 12px;
  row-gap: 12px;

  li {
    padding: 20px;
    font-size: 18px;
    color: #444;
    border: 1px solid #d2d2d2;
    border-radius: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    button {
      padding: 8px 12px; 
    }
  }
`

export function ExerciseList() {
  const location = useLocation()
  const navigate = useNavigate()
  const exercises = useLiveQuery(() => db.exercises.toArray())

  const deleteExercise = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const element = event.currentTarget;
    if (!element) return 
    const exerciseId = parseInt(element.dataset.exerciseId ?? '', 10)

    try {
      await db.exercises.delete(exerciseId);
      console.log(`User with id ${exerciseId} deleted successfully.`);
    } catch (error) {
      console.error('Failed to delete exercise:', error);
    }
  }

  return (
    <List>
      {exercises?.map((exercise) => (
        <li key={exercise.id}>
          {exercise.name}
          {location.pathname === '/add-exercise' ? (
            <button data-exercise-id={exercise.id} onClick={(e) => deleteExercise(e)}>del</button>
          ) : (
            <button onClick={() => navigate(`/exercise/${exercise.name}`)}>view</button>
          )}
        </li>
      ))}
    </List>
  )
}
