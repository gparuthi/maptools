import { useEffect, useState } from "react"

export const DEBOUNCE_LATENCY = 1000

const useDebounce = <T,>(value: T, delay = DEBOUNCE_LATENCY): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
