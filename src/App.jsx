import { useState } from 'react'
import React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainRouter from './routers/Router'
import { Provider } from 'react-redux'
import store from './components/Redux/store'
import { Navbar } from './components/BasicComponent/Navbar'
import theme from './components/Theme'
import { ThemeProvider } from '@mui/material'
import Footer from './components/BasicComponent/Footer'
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
 <Provider  store={store}>
     <ThemeProvider theme={theme}>
      
    <Navbar/>
    <MainRouter/>
    {/* <Footer/> */}
     </ThemeProvider>
 </Provider>
  )
}

export default App
