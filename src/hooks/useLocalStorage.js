'use client'

import { useState, useEffect } from 'react'

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(key)
    if (stored) {
      setValue(JSON.parse(stored))
    }
    setIsLoaded(true)
  }, [key])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value, isLoaded])

  return [value, setValue, isLoaded]
}

export default useLocalStorage
