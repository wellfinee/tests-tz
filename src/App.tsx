import { Route, Routes } from 'react-router'
import './App.css'
import { FC } from 'react'
import Dashboard from './pages/dashboard/dashboard'
import ResultsPage from './pages/result'
import FinalizePage from './pages/finalize'

const App: FC = () => {

  return (
    <> 
    <Routes>
      <Route index element={<Dashboard />} /> 
      <Route path="/results/:testId" element={<ResultsPage />} />
      <Route path="/finalize/:testId" element={<FinalizePage />} />
    </Routes>
    </>
  )
}

export default App
