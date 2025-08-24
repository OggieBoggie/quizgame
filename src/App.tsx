import { useState } from 'react';
import quizData from './data/quizData.json';
import QuizList from './components/QuizList';
import Quiz from './components/Quiz';
import type { Quiz as QuizType } from './types/Quiz';
import Header from './components/Header';
import './App.css'
import SignIn from './components/Signin';

import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const quiz = quizData as QuizType[];

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
  const [user] = useAuthState(auth)
  
  return (
    <div className="space-y-4 p-4 min-h-screen bg-gray-900 text-gray-100">
      {!user ? <SignIn /> : (
        <div>
          <Header />
          <h2 className='text-xl font-semibold mt-4'>About</h2>
          <p className='text-gray-300'>This is a sample quiz application built with React.</p>
            {!selectedQuiz ? (
              <QuizList
                quizzes={quiz}
                onQuizSelect={(quiz) => setSelectedQuiz(quiz)}
              />
            ) : (
              <Quiz
                quiz={selectedQuiz}
                onQuizComplete={(score) => {
                  setSelectedQuiz(null);
                }}
              />
    
            )
          }
          </div>
      )}
    </div>
  )
}

export default App
