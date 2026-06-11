import { MainNav } from "../components/MainNav";
import { SetList } from "../components/SetList";
import { useParams } from "react-router";

export default function ExercisePage () {
    const { name } = useParams()
    return (
        <>
            <header><h1>{name}</h1></header>
            <SetList exercise={name} /> 
            <MainNav />
        </>
    )
}