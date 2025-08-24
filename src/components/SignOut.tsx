import { auth } from "../types/firebase";

export default function SignOut() {
    return (
        auth.currentUser && (
            <div className="flex justify-end p-4">
                <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
                    onClick={() => auth.signOut()}
                >
                    Sign Out
                </button>
            </div>
        )
    )
}