import './App.css'
import NavBar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/pages/Home/HomePage'
import MemoryDetails from './components/pages/ViewMemory/MemoryDetails'

function App() {
  return (
    <Router>
      <NavBar />
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 px-2'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/memory/:memoryId' element={<MemoryDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
