import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainRouter from './routers/Router'
import { Provider } from 'react-redux'
import store from './components/Redux/store'

function App() {
  const [count, setCount] = useState(0)

  return (
 <Provider  store={store}>
    <MainRouter/>
 </Provider>
  )
}

export default App
