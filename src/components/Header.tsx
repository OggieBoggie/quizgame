import SignOut from "./SignOut";

export default function Header() {
    return (
        <header className="bg-gray-800 p-4 text-gray-100 sticky top-0">
            <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Quiz Application</h1>
            <SignOut />
            </div>
            <p className="text-gray-300">Test your knowledge with our quizzes!</p>
        </header>
    );
}