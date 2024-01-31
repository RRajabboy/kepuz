import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useFetch(path) {
    const [ data, setData ] = useState({})
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState("")

    const getData = async () => {
        setLoading(true)
        try {
            const fetched = await axios.get("https://kep.uz/api/problems/" + path)
            setData(fetched.data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        getData()
    }, [])

    return { data, loading, error }
}
