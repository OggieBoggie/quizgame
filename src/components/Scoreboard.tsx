import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';
import { firestore } from '../types/firebase';

interface ScoreboardProps {
    quizId: number;
    userCount: number;
}

type Score = {
    id: string;
    displayName?: string;
    photoURL?: string;
    finalScore: number;
}

export default function Scoreboard({ quizId, userCount}: ScoreboardProps) {
    const [scores, setScores] = useState<Score[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(firestore, 'scores'),
        where('quizId', '==', quizId), 
        orderBy('finalScore', 'desc'), 
        limit(userCount));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data() as Omit<Score, 'id'>
            }))
            setScores(data);
            setLoading(false);
        })
        return () => unsubscribe()
    }, [quizId, userCount]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 bg-gray-700 text-gray-100 rounded-lg shadow-md w-full max-w-md my-4">
            <h2 className="text-lg font-bold mb-4">Leaderboard</h2>
            {scores.length === 0 ? (
                <p>No scores available</p>
            ) : (
                <ul>
                    {scores.map((score, index) => (
                        <li 
                        key={score.id}
                        className="flex items-center mb-2"
                        >
                            <span className="font-bold mr-2">
                                {index + 1}.
                            </span>
                            <img 
                                src={score.photoURL} 
                                alt={score.displayName} 
                                className="w-8 h-8 rounded-full mr-2"
                                />
                            <h1 className="flex-1">
                                {score.displayName || 'Anonymous'}

                            </h1>
                            <span className="font-semibold">
                                {score.finalScore}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}