import { useCallback, useState } from 'react'
import useAuth from './useAuth'

const useAuthRequest = () => {
    const [error, setError] = useState(false)
    const {token, logout} = useAuth()

    const request = useCallback(async (url, options) => {
        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL + '/api' + url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                ...options
            })

            if (res.status === 403) {
                logout()
            }

            const data = await res.json()

            return data
        } catch (e) {
            setError(e)
        }
        
    }, [logout, token])
    
    return {request, error}
}

export default useAuthRequest;