import axios from 'axios'
import React, { useEffect, useState }from 'react'
import { decodeToken } from 'react-jwt'
import { useNavigate } from 'react-router-dom'

function Dashboard( {data} ) {

    const [ username, setUsername ] = useState()
    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem('token')
        navigate('../login')
    }

    async function callUserData() {
        await axios.get('https://mern-simple-form.herokuapp.com/user/dashboard', {
            headers: { 'x-access-token': localStorage.getItem('token'), },
        }).then(res => setUsername(res.status))
    } 

    // verify user if logged in
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            const user = decodeToken(token)
            if(!user) {
                localStorage.removeItem('token')
                navigate('login')
            } else {
                callUserData()
            }
        }
    }, [])

    return (
        <div>
            {username ? 'Login successful' : 'No user logged in'}
            {username && <button onClick={logout}>Log out</button>}
        </div>
    )
}

export default Dashboard
