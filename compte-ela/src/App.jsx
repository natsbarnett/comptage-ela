import { useState } from 'react'
// './assets/react.svg'
import MoneyCounter from './utils/Count'


function App() {
  const [count, setCount] = useState(0)

  return (
  <MoneyCounter/>
  )
}

export default App
