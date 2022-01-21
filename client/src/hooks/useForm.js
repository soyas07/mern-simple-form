import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function useForm() {

    const [ resData, setData ] = useState()
    const [ error, setError ] = useState()
    const navigate = useNavigate()

    const callRegister = async (firstName, lastName, email, password) => {
        const response = await axios.post('https://mern-simple-form.herokuapp.com/user/register', {
            fName: firstName,
            lName: lastName,
            em: email,
            pass: password,
        })

        const res = await response.data
        if(res.status === 'ok') navigate('login')
        else setError('Email already exist!')
    }

    const callLogin = async (email, password) => {
        const response = await axios.post('https://mern-simple-form.herokuapp.com/user/login', {
            em: email,
            pass: password,
        })

        const res = await response.data
        setData(res)
        if(res.user) {
            localStorage.setItem('token', res.user)
            navigate('dashboard')
        } else {
            setError('Incorrect username or password')
        }
    } 

    const submitForm = (firstName, lastName, email, password, value) => {
        if (value === 'register') callRegister(firstName, lastName, email, password)
        if (value === 'login') callLogin(email, password) 
    }
    
    return { submitForm, resData, error, setError }
}

export default useForm
