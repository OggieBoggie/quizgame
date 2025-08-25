# React Quiz Game

A quiz application built with **React + TypeScript + TailwindCSS**.
Plans to incorporate a real time leaderboard with Firebase
Users can choose from a list of available quizzes, and answer multiple choice of true/false questions

---

## Features
- **Quiz List** - Displays all available quizzes from JSON data file.
- **Score Tracking** - Keeps track of the user's score
- **Real Time Leaderboard** - Users can compare their scores to others at the end
- **OAuth** - Allow authentication with google accounts
- **Filtering and Querying Quizzes** - Allows users to search for certain quizzes

## Technology
- React (Vite)
- TypeScript
- TailwindCSS
- Firebase

## Setup

### 1. Clone repository
```bash
git clone https://github.com/OggieBoggie/quizgame.git
cd react-quiz app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup a firebase project
https://console.firebase.google.com/u/0/

### 4. Create a .env file with firebase credentials
```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

### 5. Run the development server
```bash
npm run dev
```