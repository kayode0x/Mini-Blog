import { useState, useEffect } from 'react'

const useFetch = ( url ) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Could not get data from the database');
                }
                return res.json()
            })
            .then(data => {
                setData(data)
                setIsLoading(false)
                setError(null)
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    // empty if statement
                } else {
                    setIsLoading(false)
                    setError(err)
                }

            })

        return () => abortCont.abort()

    }, [url])

    return { data, isLoading, error };
}

export default useFetch;