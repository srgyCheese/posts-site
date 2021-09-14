import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './app.css'
import Routes from './Routes'
import Navbar from './components/Navbar'
import { useDispatch } from 'react-redux'
import { setReady } from './redux/auth/actions'
import useAuth from './hooks/useAuth'

const App = () => {
    const dispatch = useDispatch()
    const {login, logout} = useAuth()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!!token) {
            login(token)
        } else {
            logout()
        }
        
        dispatch(setReady(true))
    }, [dispatch, login, logout])

    return (
        <>
            <Navbar />
            <Routes />
        </>
    )
}

export default App
