import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [message, setMessage] = useState("");

////this is callback arrey, this is dependency arrey

  useEffect(() => {
    fetch("/api/message")
    .then((res) => res.json())
    .then((data) => setMessage(data.message))
    .catch((err) => {console.error("Error Fetching message", err)

    })
  }, []);

  return (
    <>
      <h1> Welcome to AyushiDev Frontend</h1>
     <h2>Data {message}</h2>
    </>
  )
}

export default App
