import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import useForm from './hooks/useForm';
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Loading from './components/Loading';

function App() {

  const { submitForm, resData, error, setError, isLoading, setLoading } = useForm()

  const [form, setForm] = useState(
      {
          firstName: '',
          lastName: '',
          email: '',
          password: ''
      }
  )

  useEffect(() => {
    setError('')
  }, [form])

  const handleInput = e => {
      setForm({
          ...form,
          [e.target.name]: e.target.value
      })
  }

  const handleSubmit = value => {
      submitForm(form.firstName, form.lastName, form.email, form.password, value)
  }

  return (
      <div className='form-container'>
        <Routes>
          <Route path="/" element={<Register error={error} handleInput={handleInput} form={form} handleSubmit={handleSubmit} />} />
          <Route path="login" element={<Login error={error} handleInput={handleInput} form={form} handleSubmit={handleSubmit} />} />
          <Route path="dashboard" element={<Dashboard data={resData} setLoading={setLoading} />} />
          
        </Routes>
        {/* {isLoading && <Loading />} */}
      </div>
  );
}

export default App;
