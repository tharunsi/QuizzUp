import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchQuizById } from "../../api/quizApi"; 
import Quiz from "../Quiz/Quiz";
import "./QuizPage.css";

const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [testFinished, setTestFinished] = useState(false);

  const videoRef = useRef(null);
  const cameraStreamRef = useRef(null);
  const micStreamRef = useRef(null);

  // Load quiz data
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const res = await fetchQuizById(id);
        const quizData = res.data;
        setQuiz(quizData);

        const totalTime = quizData.questions.length * (quizData.timePerQuestion || 30);
        setTimeLeft(totalTime);
      } catch (err) {
        console.error("Error fetching quiz:", err);
      }
    };
    loadQuiz();
  }, [id]);

  // Timer
  useEffect(() => {
    if (!quiz) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setTestFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz]);

  // Tab switch detection
  useEffect(() => {
    let tabSwitchCount = 0;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        tabSwitchCount++;
        console.warn("Tab switched:", tabSwitchCount);
    
        // OPTIONAL: send to backend // axios.post("/api/quiz/violation", { type: "TAB_SWITCH", quizId: id });

        if (tabSwitchCount >= 2) {
          alert("You are disqualified due to tab switching");
          setTestFinished(true);
          setTimeLeft(0);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [id]);

  // Stop camera & mic when test finishes
useEffect(() => {
  if (testFinished) {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach(track => track.stop());
      cameraStreamRef.current = null;
      console.log("Camera stopped because test finished");
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
      console.log("Mic stopped because test finished");
    }

    // Remove video srcObject to avoid black screen
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }
}, [testFinished]);

  
  useEffect(() => {
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        cameraStreamRef.current = stream;
        micStreamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        alert("Camera and microphone permission required");
        setTestFinished(true);
        setTimeLeft(0);
      }
    };

    startMedia();

    return () => {
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach(track => track.stop());
        cameraStreamRef.current = null;
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(track => track.stop());
        micStreamRef.current = null;
      }
    };
  }, []);

  const formatTime = sec => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!quiz) return <p>Loading quiz...</p>;

  

  return (
    <div className="quiz-page">
      <h1>{quiz.heading}</h1>

      {/* Timer and Camera - only show while test is active */}
      {!testFinished && timeLeft > 0 && (
        <>
          <div className="quiz-timer">⏱ {formatTime(timeLeft)}</div>
          <video
            ref={videoRef}
            autoPlay
            muted
            style={{ width: "150px", position: "fixed", bottom: 10, right: 10 }}
          />
        </>
      )}

      <div className="quizpage-container">
        <Quiz questions={quiz.questions} timeUp={timeLeft <= 0}  onSubmit={() => setTestFinished(true)} />
      </div>
    </div>
  );
};

export default QuizPage;
