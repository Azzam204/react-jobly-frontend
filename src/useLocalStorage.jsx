import { useState } from "react"

/** Custom hook for saveing data to state and LocalStorage
 * 
 * accepts a key and allows you to access the value with 'item" and set the value with "setLocalStorage"
 * 
 * when setLocalStorage is called : state and localStorage are updated
 * 
 * if value is set to null, the key is removed from local storage  */ 

function useLocalStorage(key) {
  
  const [item,setItem] = useState(localStorage.getItem(key))
  


  const setLocalStorage = (val) => {
    setItem(val)
    if (val === null) {
      localStorage.removeItem(key)
    }
    else {
      localStorage.setItem(key, val)
    }
  }

  return [item, setLocalStorage]
}

export default useLocalStorage
