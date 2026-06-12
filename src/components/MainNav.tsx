import styled from "styled-components"
import { NavLink } from "react-router"

const NavWrapper = styled.nav`
    display: flex;
    flex-direction: row;
    padding: 24px 8px 12px;
    justify-content: space-between;
    column-gap: 12px;
    position: fixed;
    bottom: 0;
    width: calc(100% - 16px);
    max-width: 600px;
    margin: 0 auto;
    background: white;
    border-top: 1px solid #d2d2d2;

    a {
        width: 100%;
        flex-basis: 33%;
        border: 1px solid gray;
        text-align: center;
        padding: 20px;
        border-radius: 20px;
        color: inherit;
        text-decoration: none;

        &.active {
            background: #d2d2d2;
        }
    }
`

export function MainNav () {
    return (
        <NavWrapper>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/workout">Workout</NavLink>
            <NavLink to="/add-exercise">Add</NavLink>
        </NavWrapper>
    )
}