import { useState, useEffect } from 'react'

export const useFetchJson = (url) => {
    const [state, setState] = useState()
  
    useEffect(() => {
      const dataFetch = async () => {
        const data = await fetch(url)
        const dataJson = await data.json()
        setState(dataJson)
      }
      dataFetch()
    }, [url])
    return [ state ]
}