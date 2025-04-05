# 🧠 Gemini Communication Backend

This is a lightweight Flask-based backend powered by Google Gemini. It interprets button-based symbol selections from non-verbal users into natural language messages using AI. The backend maintains per-user sessions to preserve context and allows emergency message generation.

---

## 🚀 Features

- Session-based AI conversations using Gemini 1.5 Pro
- Interprets selected symbols (e.g., "hungry", "please") into full sentences
- Emergency message crafting with user name, address, and condition
- Dynamic user profile updates (name, address, condition)
- In-memory session storage with context awareness
- Uses `.env` for safe API key handling

---

## 🛠 Requirements

- Python 3.8+
- Google Gemini API key (Get it here: https://aistudio.google.com/app/apikey)
- pip, venv (recommended)

---

## ⚙️ Setup Instructions

1. Navigate to the backend folder:

   cd backend

2. Create and activate a virtual environment:

   python -m venv venv
   source venv/bin/activate        # On Windows: venv\Scripts\activate

3. Install dependencies:

   pip install -r requirements.txt

4. Create your `.env` file:

   GEMINI_API_KEY=your-google-api-key-here

5. Run the Flask server:

   flask run

You’ll see:

   * Running on http://127.0.0.1:5000

---

## 🧪 API Endpoints

### ✅ GET /

Health check  
Returns a string to confirm the server is running.

Response:
"✅ Gemini Flask API is running!"

---

### 🧠 POST /init_session

Start a new session with context and user profile.

Request:

{
  "name": "Alex",
  "address": "123 Main Street, Bucharest",
  "condition": "non-verbal with epilepsy",
  "context": "Alex is a 25-year-old with autism and cannot speak. Please help them communicate using selected visual symbols."
}

Response:

{
  "session_id": "f12a9a..."
}

---

### 💬 POST /send_symbols

Send user-selected symbols and get a natural sentence back.

Request:

{
  "session_id": "f12a9a...",
  "symbols": ["hungry", "soup", "please"]
}

Response:

{
  "message": "I'm hungry and would like some soup, please."
}

---

### 🚨 POST /send_emergency

Craft a clear emergency message based on symbols + user profile (name, address, condition).

Request:

{
  "session_id": "f12a9a...",
  "symbols": ["pain", "head", "dizzy"]
}

Response:

{
  "emergency_message": "This is Alex. I am non-verbal and located at 123 Main Street, Bucharest. I am experiencing severe head pain and dizziness. Please send help immediately.",
  "name": "Alex",
  "address": "123 Main Street, Bucharest"
}

---

### ✏️ PATCH /update_profile

Update the user’s name, address, or medical condition for a session.

Request:

{
  "session_id": "f12a9a...",
  "address": "Emergency Hospital, Cluj",
  "condition": "non-verbal with seizure risk"
}

Response:

{
  "message": "Profile updated successfully.",
  "updated_profile": {
    "name": "Alex",
    "address": "Emergency Hospital, Cluj",
    "condition": "non-verbal with seizure risk"
  }
}

> Gemini will also be informed that the profile has changed for contextual continuity.

---

### 🧹 POST /clear_sessions

Clears all active chat sessions (dev tool).

Response:

{
  "message": "All sessions cleared."
}

---

## 🧠 Tech Stack

- Backend: Flask + Google Generative AI SDK
- AI Model: models/gemini-1.5-pro-latest
- Session Handling: In-memory (UUID → chat + profile)
- Security: API key loaded via python-dotenv

---

## 💡 Future Ideas

- Save session history to a database
- Add real SMS/email dispatch for emergency messages
- Enable voice tone and language configuration
- Add multi-language support for symbol output
- Create downloadable audio files for TTS

---
