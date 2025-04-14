

import './App.css'
import { Routes, Route } from 'react-router-dom'


// import ChatMessage from './Pages/Chatbot/ChatMessage' use this for reference
function App() {
  

  return (
    <div>
    
    <Routes>
     <Route path="/home" element={<Home />} />
     <Route path="/dashboard" element={<Dashboard />} /> 
     <Route path="/quiz-landing" element={<Quizlanding />} /> 
     
     <Route path="/" element={<Landing/>} />

    
    </Routes>

    </div>
  )
}

export default App
