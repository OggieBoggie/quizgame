import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../types/firebase'

export default function SignIn() {
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            console.error("Error signing in with Google:", err);
        }

        console.log("User signed in with Google");
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen w-screen bg-gray-900 text-gray-100'>
            <h1 className='text-3xl font-bold mb-4'>Sign In</h1>
             <button
                className='px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200'
                onClick={signInWithGoogle}
            >
                Sign in with Google
            </button>
        </div>
    )

}