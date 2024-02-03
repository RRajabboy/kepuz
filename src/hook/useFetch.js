import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useFetch(path, param) {
    const [ data, setData ] = useState({})
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState("")
    const [ params, setParams ] = useState(param || {})

    const getData = async (par, noloader) => {
        setLoading(!noloader)
        try {
            const fetched = await axios.get("https://kep.uz/api/problems/" + path, { params: par || params })
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

    const changeParams = (p, noLoading) => {
        setParams(p)
        getData(p, noLoading)
    }

    return { data, loading, error, refresh: getData, params, changeParams }
}
