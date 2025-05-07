import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import './App.css'

function App() {

  return (
    <BrowserRouter>
    <ToastContainer/>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App
