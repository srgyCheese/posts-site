import { useCallback, useState } from 'react'

const useApiRequest = () => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const request = useCallback(async (url, options) => {
        try {
            setLoading(true)
            const res = await fetch(process.env.REACT_APP_SERVER_URL + '/api' + url, {
                ...options
            })

            const data = await res.json()

            setLoading(false)

            return data
        } catch (e) {
            setError(e)
        }
        
    }, [])
    
    return {request, error, loading}
}

export default useApiRequest