

import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import Quizlanding from './Pages/Quizlanding/Quizlanding'
import Landing from './Pages/Landing/Landing'
import Leaderboard from './Pages/Leaderboard/Leaderboard'
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'
import Result from './Pages/Result/Result'
import Profile from './Pages/Profile/Profile'


function App() {
  

  return (
    <div>
    
    <Routes>
    
     <Route path="/" element={<Landing/>} />
     <Route path="/signup" element={<Signup />} /> 
     <Route path="/login" element={<Login />} /> 
     <Route path="/dashboard" element={<Dashboard />} /> 
     <Route path="/quiz-landing" element={<Quizlanding />} /> 
     <Route path="/leaderboard" element={<Leaderboard />} /> 
     <Route path="/result" element={<Result />} /> 
     <Route path="/profile" element={<Profile />} /> 
     

    
    </Routes>

    </div>
  )
}

export default App
