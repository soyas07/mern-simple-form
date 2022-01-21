import React from 'react'
import { Link } from 'react-router-dom'

function Login({ handleInput, form, handleSubmit, error }) {

    const handleForm = e => {
        e.preventDefault()
        handleSubmit('login')
    }

    return (
        <div className='form-wrapper'>
            <h1 className='form-title'>Login to your account</h1>
            <h4 className='form-subtitle'>Don't have an account? <Link to="/">Register</Link></h4>
            <form onSubmit={handleForm} id="form-simple">
                <input type="email" name="email" required placeholder='Email' onChange={handleInput} value={form.email} />
                <input type="password" name="password" required placeholder='Password' onChange={handleInput} value={form.password} />
                {<h2 style={{fontWeight:400,color:'red',marginBottom:'.5em'}}>{error}</h2>}
                <button>Login</button>
            </form>
            
        </div>
    )
}

export default Login
