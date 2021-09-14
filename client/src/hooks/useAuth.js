import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout as logoutAction, login as loginAction } from '../redux/auth/actions'

const useAuth = () => {
    const dispatch = useDispatch()
    const {token, ready} = useSelector(state => state.auth)

    const login = useCallback(token => {
        localStorage.setItem('token', token)
        dispatch(loginAction(token))
    }, [dispatch])

    const logout = useCallback(() => {
        localStorage.removeItem('token')
        dispatch(logoutAction())
    }, [dispatch])

    return {token, login, logout, ready}
}

export default useAuth