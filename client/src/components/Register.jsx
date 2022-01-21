import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Register({ handleInput, form, handleSubmit, error }) {

    const handleForm = e => {
        e.preventDefault()
        handleSubmit('register')
    }

    return (
        <div className='form-wrapper'>
            <h1 className='form-title'>Create account</h1>
            <h4 className='form-subtitle'>Already have an account? <Link to="/login">Sign in</Link></h4>
            <form onSubmit={handleForm} id="form-simple">
                <input type="text" name="firstName" required placeholder='First Name' onChange={handleInput} value={form.firstName} />
                <input type="text" name="lastName" required placeholder='Last Name' onChange={handleInput} value={form.lastName} />
                <input type="password" name="password" required placeholder='Password' onChange={handleInput} value={form.password} />
                <input type="email" name="email" required placeholder='Email' onChange={handleInput} value={form.email} />
                {<h2 style={{fontWeight:400,color:'red',marginBottom:'.5em'}}>{error}</h2>}
                <button>Sign up</button>
            </form>
            
        </div>
    )
}

export default Register
