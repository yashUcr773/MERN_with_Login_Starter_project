import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

export function Employees() {
    const [employees, setEmployees] = useState([])
    const customAxiosPrivate = useAxiosPrivate()

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getEmployees = async () => {
            try {
                const response = await customAxiosPrivate.get('/employees', {
                    signal: controller.signal
                });
                isMounted && setEmployees(response.data.employees)
            } catch (e) {
                console.log(e)
            }
        }

        getEmployees();

        return () => {
            isMounted = false
            controller.abort()
        }

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