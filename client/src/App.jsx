

import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import Landing from './Pages/Landing/Landing'
import Leaderboard from './Pages/Leaderboard/Leaderboard'
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'
import Result from './Pages/Result/Result'
import Profile from './Pages/Profile/Profile'
import Categories from './Pages/Categories/Categories'
import StartQuiz from './Pages/Startquiz/StartQuiz'
import PostQuiz from './Pages/Admin/PostQuiz'
import QuizPage from './Pages/QuizPage/QuizPage'
import GroupsPage from './Pages/GroupPage/GroupsPage'


function App() {
  

  return (
    <div>
    
    <Routes>
    
     <Route path="/" element={<Landing/>} />
     <Route path="/signup" element={<Signup />} /> 
     <Route path="/login" element={<Login />} /> 
     <Route path="/dashboard" element={<Dashboard />} /> 
     <Route path="/quiz-categories" element={<Categories />} /> 
     <Route path="/leaderboard" element={<Leaderboard />} /> 
     <Route path="/result" element={<Result />} /> 
     <Route path="/profile" element={<Profile />} /> 
     <Route path="/quiz/:category/:topic" element={<StartQuiz />} />
     <Route path="/add-quiz" element={<PostQuiz />} /> 
     <Route path="/quiz/:category/:topic/:id" element={<QuizPage />} />
     <Route path="/groups" element={<GroupsPage />} />
    
    </Routes>

    </div>
  )
}

export default App
