import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { CONSTANTS } from "../../config/Constants";

export function Employees() {
    const [employees, setEmployees] = useState([])
    const customAxiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {

        const getEmployees = async () => {
            try {
                const response = await customAxiosPrivate(CONSTANTS.EMPLOYEES.GET_ALL_EMPLOYEES());
                setEmployees(response.data.employees)
            } catch (e) {
                console.log(e)
                navigate('/login', { state: { from: location }, replace: true })
            }
        }

        getEmployees();

    }, [])

    return (
        <article>
            <h2>Employees List</h2>
            <ul>
                {employees.map((user: any, i) => { return <li key={i}>{user.firstname}</li> })}
            </ul>
        </article>
    )
}